import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/* ============================
   CONFIGURACIÓN DB
============================ */

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Falta MONGO_URI en el archivo .env");
  process.exit(1);
}

/* ============================
   SCHEMA BENEFIT
============================ */

const benefitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, default: null },
    requirements: { type: [String], default: [] },
    deadline: { type: Date, default: null },
    stockOrQuota: { type: Number, default: 100 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Benefit = mongoose.model("Benefit", benefitSchema);

/* ============================
   BENEFITS DATA
============================ */

const benefits = [
  {
    title: "Regalo por Casamiento",
    category: "Acción Social",
    description:
      "10 días en Colonia 'Evita' (Alta Gracia – Córdoba) con media pensión y pasajes. Alternativamente $1.000.000.",
    amount: 1000000,
    stockOrQuota: 50,
  },
  {
    title: "Beneficio por Luna de Miel",
    category: "Acción Social",
    description: "Pago adicional de $300.000 al socio/a que contraiga matrimonio.",
    amount: 300000,
    stockOrQuota: 80,
  },
  {
    title: "Beneficio por Natalidad",
    category: "Acción Social",
    description: "Bonificación de $60.000 por nacimiento.",
    amount: 60000,
    stockOrQuota: 150,
  },
  {
    title: "Regalo por Nacimiento",
    category: "Acción Social",
    description: "Ajuar y cochecito para recién nacido hijo del socio.",
    stockOrQuota: 100,
  },
  {
    title: "Premio Reconocimiento Jubilados/as y Vitalicios/as",
    category: "Reconocimiento",
    description:
      "10 días en Colonia 'Evita' con media pensión. Alternativamente $1.000.000.",
    amount: 1000000,
    stockOrQuota: 40,
  },
  {
    title: "Reintegro Anteojos",
    category: "Salud",
    description: "Reintegro hasta $80.000 presentando documentación.",
    amount: 80000,
    stockOrQuota: 200,
  },
  {
    title: "Subsidio Servicio de Sepelio No Utilizado",
    category: "Fondo de Sepelio",
    description: "Reintegro hasta $1.500.000 si no se utilizó la red de sepelios.",
    amount: 1500000,
    stockOrQuota: 30,
  },
  {
    title: "Ayuda Familiar",
    category: "Fondo de Sepelio",
    description: "Subsidio de $350.000 a beneficiario del socio fallecido.",
    amount: 350000,
    stockOrQuota: 70,
  },
  {
    title: "Subsidio por Cremación",
    category: "Fondo de Sepelio",
    description: "Reintegro hasta $350.000 con documentación respaldatoria.",
    amount: 350000,
    stockOrQuota: 60,
  },
  {
    title: "Impuesto Cementerio",
    category: "Fondo de Sepelio",
    description: "Reintegro hasta $100.000 con documentación.",
    amount: 100000,
    stockOrQuota: 100,
  },
  {
    title: "Premio Estímulo Nivel Secundario Técnico",
    category: "Educación",
    description: "Premio de $90.000 para estudiantes de nivel técnico.",
    amount: 90000,
    deadline: new Date("2025-05-31"),
    stockOrQuota: 120,
  },
  {
    title: "Premio Estímulo Nivel Secundario",
    category: "Educación",
    description: "Premio de $60.000 para estudiantes nivel medio.",
    amount: 60000,
    deadline: new Date("2025-05-31"),
    stockOrQuota: 120,
  },
  {
    title: "Becas Nivel Terciario/Universitario",
    category: "Educación",
    description:
      "Beca de $150.000 para estudiantes que hayan cursado 50% de la carrera.",
    amount: 150000,
    deadline: new Date("2025-04-15"),
    stockOrQuota: 100,
  },
  {
    title: "Becas Estudios Especiales / Integración",
    category: "Educación",
    description:
      "Beca de $90.000 para escuelas especiales o acompañamiento integrado.",
    amount: 90000,
    deadline: new Date("2025-04-15"),
    stockOrQuota: 80,
  },
  {
    title: "Provisión Guardapolvos y Útiles",
    category: "Educación",
    description:
      "Entrega de útiles y guardapolvos para hijos en nivel primario.",
    deadline: new Date("2025-10-31"),
    stockOrQuota: 150,
  },
  {
    title: "Servicio de Biblioteca",
    category: "Servicios",
    description:
      "Libros de estudio y consulta para todos los niveles educativos.",
    stockOrQuota: 999,
  },
  {
    title: "Servicio Jurídico",
    category: "Servicios",
    description: "Asesoramiento jurídico y previsional para afiliados.",
    stockOrQuota: 999,
  },
  {
    title: "Servicio de Sepelio",
    category: "Servicios",
    description:
      "Cobertura nacional para afiliado y grupo familiar primario.",
    stockOrQuota: 999,
  },
];

/* ============================
   SEED EXECUTION
============================ */

const seedBenefits = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    await Benefit.deleteMany({});
    console.log("🗑️ Colección limpiada");

    await Benefit.insertMany(benefits);
    console.log("🌱 Beneficios insertados correctamente");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error al ejecutar seed:", error);
    process.exit(1);
  }
};

seedBenefits();
