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
      desc: 'The Cherub Journey Tee by ZADES adds a bold touch to your daily style. The striking colors look sharp, while the baroque cherub artwork makes it unique.<br><br>This embroidered and printed tee features clear artwork that blends classical motifs with modern streetwear. The design looks neat and stands out nicely.<br><br>Made from premium 240 GSM 100% cotton, it feels soft and substantial for everyday wear. The oversized fit makes it loose and easy to move in.<br><br>Style this Cherub Journey Tee with baggy jeans or cargos. Explore more streetwear t-shirts and oversized graphic tees.',
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
      details: ['100% cotton', 'Weight - 240 gsm', 'Embroidered and printed artwork', 'Oversized fit'],
    },
    {
      id: 'ov-002',
      name: 'Mammoth Spirit Tee',
      desc: 'The Mammoth Spirit Tee by ZADES adds a bold touch to your daily style. The stark contrast colors look sharp, while the raw sketch-art mammoth print makes it unique.<br><br>This heavyweight drop-shoulder tee features a clear mammoth sketch that brings an ancient strength to modern fashion. The design looks neat and stands out nicely.<br><br>Made from 100% premium cotton, it feels soft and substantial for everyday wear. The oversized fit makes it loose and easy to move in.<br><br>Style this Mammoth Spirit Tee with baggy jeans or cargos. Explore more streetwear t-shirts and oversized drop-shoulder tees.',
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
      details: ['100% cotton', 'Heavyweight drop-shoulder cut', 'Raw sketch-art print', 'Oversized fit'],
    },
    {
      id: 'ov-003',
      name: 'Hustle Atlas Tee',
      desc: 'The Hustle Atlas Tee by ZADES adds a bold touch to your daily style. The midnight black color looks sharp, while the 3D-rendered muscle figure makes it unique.<br><br>This premium tee features bold HUSTLE typography finished with a high-quality puff-print. The design looks neat and stands out nicely.<br><br>Made from 100% cotton, it feels soft and light for everyday wear. The oversized fit makes it loose and easy to move in.<br><br>Style this Hustle Atlas Tee with baggy jeans or cargos. Explore more streetwear t-shirts and oversized puff printed t-shirts.',
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
      details: ['100% cotton', 'Puff-print', '3D-rendered design', 'Oversized fit'],
    },
    {
      id: 'ov-004',
      name: 'Wild Butterfly Tee',
      desc: 'The Wild Butterfly Tee by ZADES adds a bold touch to your daily style. The vibrant colors look sharp, while the heart-shaped butterfly swarm makes it unique.<br><br>This screen-printed tee features striking graphics on the front and back, with gothic lettering that reads "Untamed wilderness beckons restless spirit." The design looks neat and stands out nicely.<br><br>Made from premium 260 GSM 100% cotton, it feels soft and light for everyday wear. The oversized fit makes it loose and easy to move in.<br><br>Style this Wild Butterfly Tee with baggy jeans or cargos. Explore more streetwear t-shirts and oversized printed tees.',
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
      details: ['100% cotton', 'Weight - 260 gsm', 'Screen print (front & back)', 'Oversized fit'],
    },
  ],
  elegant: [
    {
      id: 'el-001',
      name: 'Signature Stripe Rugby',
      desc: 'The Signature Stripe Rugby by ZADES adds an elegant touch to your daily style. The navy and cream color block looks sharp, while the classic stripe pattern makes it unique.<br><br>This long-sleeve rugby shirt features a classic collar that brings heritage streetwear done right. The design looks neat and stands out nicely.<br><br>Made from 100% premium cotton, it feels soft and substantial for everyday wear. The refined elegant fit makes it comfortable and easy to move in.<br><br>Style this Signature Stripe Rugby with tailored trousers or clean denim. Explore more elegant streetwear and premium long-sleeve polos.',
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
      details: ['100% cotton', 'Long-sleeve rugby collar', 'Classic navy & cream block stripes', 'Elegant fit'],
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
