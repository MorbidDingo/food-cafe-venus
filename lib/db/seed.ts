import { eq } from "drizzle-orm";
import { db } from "./index";
import * as schema from "./schema";

async function seed() {

  // ─── Create Admin User ─────────────────────────────────
  console.log("👤 Creating admin user...");

  const existingAdmin = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, "admin@schoolcafe.com"));

  if (existingAdmin.length > 0) {
    console.log("  ⏭️  Admin user already exists, skipping...");
  } else {
    // Use Better Auth's internal API to create the user with proper password hashing
    const { auth } = await import("../auth");
    const response = await auth.api.signUpEmail({
      body: {
        name: "Admin",
        email: "admin@schoolcafe.com",
        password: "Admin@123",
      },
    });

    if (response?.user) {
      // Update the user's role to ADMIN
      await db
        .update(schema.user)
        .set({ role: "ADMIN" })
        .where(eq(schema.user.id, response.user.id));
      console.log("  ✅ Admin user created (admin@schoolcafe.com / Admin@123)");
    } else {
      console.log("  ⚠️  Failed to create admin user");
    }
  }

  // ─── Seed Menu Items ───────────────────────────────────
  console.log("\n🌱 Seeding menu items...");

  const menuItems = [
    // Snacks
    {
      name: "Samosa",
      description: "Crispy golden pastry filled with spiced potatoes and peas",
      price: 15,
      category: "SNACKS" as const,
      available: true,
    },
    {
      name: "Vada Pav",
      description: "Mumbai's favorite street food — spiced potato fritter in a pav bun",
      price: 20,
      category: "SNACKS" as const,
      available: true,
    },
    {
      name: "Pav Bhaji",
      description: "Buttery bread rolls served with mashed vegetable curry",
      price: 40,
      category: "SNACKS" as const,
      available: true,
    },
    {
      name: "Sandwich",
      description: "Grilled vegetable sandwich with cheese and chutney",
      price: 30,
      category: "SNACKS" as const,
      available: true,
    },
    {
      name: "French Fries",
      description: "Crispy golden fries with ketchup",
      price: 35,
      category: "SNACKS" as const,
      available: true,
    },

    // Meals
    {
      name: "Veg Thali",
      description: "Complete meal with roti, rice, dal, sabzi, and salad",
      price: 60,
      category: "MEALS" as const,
      available: true,
    },
    {
      name: "Fried Rice",
      description: "Indo-Chinese style fried rice with vegetables",
      price: 45,
      category: "MEALS" as const,
      available: true,
    },
    {
      name: "Chole Bhature",
      description: "Spiced chickpea curry served with fluffy fried bread",
      price: 50,
      category: "MEALS" as const,
      available: true,
    },
    {
      name: "Noodles",
      description: "Hakka noodles stir-fried with fresh vegetables",
      price: 40,
      category: "MEALS" as const,
      available: true,
    },

    // Drinks
    {
      name: "Mango Lassi",
      description: "Refreshing yogurt-based mango smoothie",
      price: 25,
      category: "DRINKS" as const,
      available: true,
    },
    {
      name: "Masala Chai",
      description: "Traditional Indian spiced tea",
      price: 10,
      category: "DRINKS" as const,
      available: true,
    },
    {
      name: "Fresh Lime Soda",
      description: "Chilled lime soda — sweet or salted",
      price: 20,
      category: "DRINKS" as const,
      available: true,
    },
    {
      name: "Cold Coffee",
      description: "Creamy iced coffee blended with milk",
      price: 30,
      category: "DRINKS" as const,
      available: true,
    },
    {
      name: "Buttermilk",
      description: "Cool spiced buttermilk (chaas)",
      price: 15,
      category: "DRINKS" as const,
      available: true,
    },
  ];

  // Check if menu items already exist
  const existingItems = await db.select().from(schema.menuItem);
  if (existingItems.length > 0) {
    console.log(`  ⏭️  ${existingItems.length} menu items already exist, skipping...`);
  } else {
    for (const item of menuItems) {
      await db.insert(schema.menuItem).values(item);
      console.log(`  ✅ ${item.name} (${item.category}) — ₹${item.price}`);
    }
    console.log(`\n🎉 Seeded ${menuItems.length} menu items successfully!`);
  }

  console.log("\n✨ Seed complete!");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
