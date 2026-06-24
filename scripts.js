// 1. Replace these with your real Supabase project details
const SUPABASE_URL = "https://gclunxqkrvhoduhouqqh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbHVueHFrcnZob2R1aG91cXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMDcxMjQsImV4cCI6MjA5Nzg4MzEyNH0.MH7mPS5bO12NgScg36ct5Qbk5XNfdGfDFHvGKg94xYI";

// 2. Create Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 3. Get form elements
const form = document.getElementById("productForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

// 4. Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const product = document.getElementById("product").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const description = document.getElementById("description").value.trim();

  if (!name || !product || !price || !description) {
    message.textContent = "Please fill in all fields.";
    message.style.color = "red";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  try {
    const { data, error } = await supabaseClient
      .from("products")
      .insert([
        {
          name: name,
          product: product,
          price: price,
          description: description
        }
      ]);

    if (error) throw error;

    message.textContent = "Product saved successfully!";
    message.style.color = "green";
    form.reset();
  } catch (err) {
    console.error(err);
    message.textContent = "Error saving product: " + err.message;
    message.style.color = "red";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Save Product";
  }
});
