import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SHOP_OWNER_EMAIL = "yogi757482@gmail.com";
const SHOP_OWNER_WHATSAPP = "917305539146";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod,
      items,
      totalAmount,
    } = body;

    if (!customerName || !customerEmail || !customerPhone) {
      return new Response(
        JSON.stringify({ error: "Missing required customer fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        payment_method: paymentMethod,
        items: items,
        total_amount: totalAmount,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const itemsSummary = items
      .map((item: any) => `- ${item.name} (Size: ${item.selectedSize}, Qty: ${item.quantity}) - Rs.${item.price * item.quantity}`)
      .join("\n");

    const emailSubject = `New Order #${data.id} - A to Z Clothings`;
    const emailHtml = `
      <h2>New Order Received - A to Z Clothings</h2>
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> ${customerName}<br>
      <strong>Email:</strong> ${customerEmail}<br>
      <strong>Phone:</strong> ${customerPhone}<br>
      <strong>Payment Method:</strong> ${paymentMethod}</p>
      <h3>Order Items</h3>
      <pre>${itemsSummary}</pre>
      <h3>Total Amount: Rs.${totalAmount}</h3>
      <p>Order ID: ${data.id}<br>Date: ${new Date().toISOString()}</p>
    `;

    const whatsappMessage = `*New Order - A to Z Clothings*%0AOrder ID: ${data.id}%0A%0A*Customer:* ${customerName}%0A*Phone:* ${customerPhone}%0A*Email:* ${customerEmail}%0A*Payment:* ${paymentMethod}%0A%0A*Items:*%0A${items.map((item: any) => `${item.name} (Size:${item.selectedSize}, Qty:${item.quantity}) - Rs.${item.price * item.quantity}`).join(", ")}%0A%0A*Total: Rs.${totalAmount}*`;

    const emailResults: { sent: boolean; error?: string } = { sent: false };
    const whatsappResults: { sent: boolean; error?: string } = { sent: false };

    // --- Send Email via Resend ---
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "A to Z Clothings <onboarding@resend.dev>",
            to: [SHOP_OWNER_EMAIL],
            subject: emailSubject,
            html: emailHtml,
          }),
        });
        if (emailRes.ok) {
          emailResults.sent = true;
        } else {
          const errText = await emailRes.text();
          emailResults.error = `Resend API error: ${emailRes.status} ${errText}`;
          console.error("Email send failed:", emailResults.error);
        }
      } catch (err) {
        emailResults.error = String(err);
        console.error("Email send exception:", err);
      }
    } else {
      emailResults.error = "RESEND_API_KEY secret not configured";
      console.warn("RESEND_API_KEY not set - email notification skipped");
    }

    // --- Send WhatsApp via CallMeBot ---
    const callmebotApiKey = Deno.env.get("CALLMEBOT_API_KEY");
    if (callmebotApiKey) {
      try {
        const waUrl = `https://api.callmebot.com/whatsapp.php?phone=${SHOP_OWNER_WHATSAPP}&text=${whatsappMessage}&apikey=${callmebotApiKey}`;
        const waRes = await fetch(waUrl);
        if (waRes.ok) {
          whatsappResults.sent = true;
        } else {
          const errText = await waRes.text();
          whatsappResults.error = `CallMeBot API error: ${waRes.status} ${errText}`;
          console.error("WhatsApp send failed:", whatsappResults.error);
        }
      } catch (err) {
        whatsappResults.error = String(err);
        console.error("WhatsApp send exception:", err);
      }
    } else {
      whatsappResults.error = "CALLMEBOT_API_KEY secret not configured";
      console.warn("CALLMEBOT_API_KEY not set - WhatsApp notification skipped");
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId: data.id,
        notifications: {
          email: emailResults,
          whatsapp: whatsappResults,
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
