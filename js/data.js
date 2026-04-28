// ===== ZADES Product Database =====
// Image naming convention:
//   tshirt image = assets/[name]_tshirt.jpeg  (plain product, no model)
//   model image  = assets/[name]_model.png    (person wearing)
// See RENAME GUIDE at bottom of this file.

const ZADES_PRODUCTS = {
  oversized: [
    {
      id: 'ov-001',
      name: 'Cherub Journey Tee',
      desc: 'Baroque cherubs meet streetwear. Embroidered and printed artwork on premium 240GSM cotton.',
      price: 849,
      category: 'oversized',
      // tshirt: oversized__3_.jpeg (blue cherub) & oversized__6_.jpeg (pink cherub)
      // model: dedicated model shots available for each color
      tshirt: 'assets/bg_blue.jpeg',
      modelImg: 'assets/cherub_model_blue.jpg',
      images: ['assets/bg_blue.jpeg', 'assets/bg_pink.jpeg'],
      colors: [
        { name: 'Royal Blue', hex: '#2563EB', image: 'assets/bg_blue.jpeg', modelImage: 'assets/cherub_model_blue.jpg' },
        { name: 'Baby Pink', hex: '#F9A8D4', image: 'assets/bg_pink.jpeg', modelImage: 'assets/cherub_model_pink.jpg' },
      ],
      sizes: { XS: 5, S: 8, M: 10, L: 6, XL: 3, XXL: 2 },
    },
    {
      id: 'ov-002',
      name: 'Mammoth Spirit Tee',
      desc: 'Raw sketch-art mammoth print on heavyweight drop-shoulder cut. For those who carry strength.',
      price: 899,
      category: 'oversized',
      // tshirt: oversized__4_.jpeg (black mammoth), oversized__7_.jpeg (white with red mammoth)
      // model: dedicated model shots available for each color
      tshirt: 'assets/bg_black.jpeg',
      modelImg: 'assets/mammoth_model_black.jpg',
      images: ['assets/bg_black.jpeg', 'assets/bg_white.jpeg'],
      colors: [
        { name: 'Jet Black', hex: '#111111', image: 'assets/bg_black.jpeg', modelImage: 'assets/mammoth_model_black.jpg' },
        { name: 'Pure White', hex: '#F5F5F5', image: 'assets/bg_white.jpeg', modelImage: 'assets/mammoth_model_white.jpg' },
      ],
      sizes: { XS: 0, S: 5, M: 8, L: 4, XL: 2, XXL: 0 },
    },
    {
      id: 'ov-003',
      name: 'Hustle Atlas Tee',
      desc: '3D-rendered muscle figure with bold HUSTLE typography. Puff-print on premium black tee.',
      price: 999,
      category: 'oversized',
      // tshirt: oversized__5_.jpeg (hustle black tshirt)
      // model:  oversized__4_.png (guy wearing hustle tee)
      tshirt: 'assets/bg_black1.jpeg',
      modelImg: 'assets/hustle_model.png',
      images: ['assets/bg_black1.jpeg'],
      colors: [
        { name: 'Midnight Black', hex: '#0a0a0a', image: 'assets/bg_black1.jpeg', modelImage: 'assets/hustle_model.png' },
      ],
      sizes: { XS: 2, S: 4, M: 6, L: 5, XL: 3, XXL: 1 },
    },
    {
      id: 'ov-004',
      name: 'Wild Butterfly Tee',
      desc: 'Heart-shaped butterfly swarm. Gothic lettering reads "Untamed wilderness beckons restless spirit."',
      price: 849,
      category: 'oversized',
      // tshirt: oversized.jpeg (sky blue butterfly), oversized__2_.jpeg (khaki butterfly)
      // model:  oversized__2_.png (guy in sky blue butterfly), oversized__3_.png (guy in khaki butterfly)
      tshirt: 'assets/bg_lightblue.jpeg',
      modelImg: 'assets/butterfly_model_blue.png',
      images: ['assets/bg_lightblue.jpeg', 'assets/bg_brown.jpeg'],
      colors: [
        { name: 'Sky Blue', hex: '#93C5FD', image: 'assets/bg_lightblue.jpeg', modelImage: 'assets/butterfly_model_blue.png' },
        { name: 'Khaki Sage', hex: '#A3A380', image: 'assets/bg_brown.jpeg', modelImage: 'assets/butterfly_model_khaki.png' },
      ],
      sizes: { XS: 3, S: 7, M: 12, L: 8, XL: 4, XXL: 2 },
    },
  ],
  elegant: [
    {
      id: 'el-001',
      name: 'Signature Stripe Rugby',
      desc: 'Classic navy & cream block stripes on a long-sleeve rugby collar. Heritage streetwear done right.',
      price: 1199,
      category: 'elegant',
      // tshirt: elegant.png (flat rugby shirt)
      // model:  elegent.png (man wearing rugby shirt)
      tshirt: 'assets/rugby_tshirt.png',
      modelImg: 'assets/rugby_model.png',
      images: ['assets/rugby_tshirt.png', 'assets/rugby_model.png'],
      colors: [
        { name: 'Navy & Cream', hex: '#1e2a5e', image: 'assets/rugby_tshirt.png', modelImage: 'assets/rugby_model.png' },
      ],
      sizes: { XS: 2, S: 5, M: 7, L: 4, XL: 2, XXL: 1 },
    },
  ],
};

// Flatten all products for search
const ALL_PRODUCTS = Object.values(ZADES_PRODUCTS).flat();

function getStockStatus(sizes) {
  const total = Object.values(sizes).reduce((a, b) => a + b, 0);
  if (total === 0) return { label: 'Out of Stock', cls: 'out-of-stock' };
  if (total < 10) return { label: `Only ${total} left`, cls: 'low-stock' };
  return { label: 'In Stock', cls: 'in-stock' };
}

/*
===========================================================
  FILE RENAME GUIDE — copy your uploaded files like this:
===========================================================

  YOUR FILE               →  SAVE AS IN assets/ FOLDER
  ─────────────────────────────────────────────────────
  oversized__3_.jpeg      →  cherub_tshirt_blue.jpeg
  oversized__6_.jpeg      →  cherub_tshirt_pink.jpeg
  oversized.png           →  cherub_model.png          (promo shot)

  oversized__4_.jpeg      →  mammoth_tshirt_black.jpeg
  oversized__7_.jpeg      →  mammoth_tshirt_white.jpeg
  oversized__4_.png       →  mammoth_model.png         (hustle model, closest match)

  oversized__5_.jpeg      →  hustle_tshirt.jpeg
  oversized__4_.png       →  hustle_model.png

  oversized.jpeg          →  butterfly_tshirt_blue.jpeg
  oversized__2_.jpeg      →  butterfly_tshirt_khaki.jpeg
  oversized__2_.png       →  butterfly_model_blue.png
  oversized__3_.png       →  butterfly_model_khaki.png

  elegant.png             →  rugby_tshirt.png
  elegent.png             →  rugby_model.png

  logo-zades.jpeg         →  logo-zades.jpeg           (keep same)
  tmpptgm5mj6.mp4         →  zades_video.mp4
===========================================================
*/
