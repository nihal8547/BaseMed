export let categoriesData = [
  { id: 'cat_1', name: 'Medical Consumables', slug: 'medical' },
  { id: 'cat_2', name: 'Medical Instruments', slug: 'instruments' },
  { id: 'cat_3', name: 'Diagnostics', slug: 'diagnostics' },
  { id: 'cat_4', name: 'Dental Supplies', slug: 'dental' },
  { id: 'cat_5', name: 'Dental Instruments', slug: 'dental' },
  { id: 'cat_6', name: 'CSSD Materials', slug: 'cssd' }
]

export let productsData = [
  // Medical Supplies
  {
    id: '1',
    name: 'Surgical Masks (3-Ply)',
    category: 'Medical Consumables',
    image: 'https://images.unsplash.com/photo-1584824227743-41bb62b0c36b?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'High-filtration 3-ply surgical masks designed for clinical and professional healthcare use.',
    description: 'Our premium surgical masks offer superior protection and breathability. Designed for comfort during extended wear, these masks feature a 3-ply construction with a high-efficiency melt-blown filter layer. Ideal for clinical settings, hospitals, and dental practices.',
    features: ['3-ply construction', 'High filtration efficiency (BFE > 99%)', 'Hypoallergenic inner layer', 'Adjustable nose clip'],
    specifications: {
      'Material': 'Non-woven fabric, Melt-blown filter',
      'Packaging': '50 pcs / box',
      'Color': 'Blue / White',
      'Standard': 'EN 14683 Type IIR'
    }
  },
  {
    id: '2',
    name: 'Sterile Examination Gloves',
    category: 'Medical Consumables',
    image: 'https://images.unsplash.com/photo-1631563019676-0f1e82aed73c?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Powder-free, nitrile examination gloves providing superior barrier protection.',
    description: 'Our sterile nitrile examination gloves provide robust protection for healthcare professionals during patient care. Powder-free for reduced allergy risk, and featuring textured fingertips for excellent grip and tactile sensitivity during examinations and procedures.',
    features: ['Powder-free', 'Latex-free nitrile', 'Textured fingertips', 'AQL 1.5 sterility assurance'],
    specifications: {
      'Material': 'Nitrile',
      'Packaging': '200 pcs / box',
      'Sizes': 'XS, S, M, L, XL',
      'Standard': 'ASTM D6319 / EN 455'
    }
  },
  {
    id: '3',
    name: 'Digital Stethoscope',
    category: 'Diagnostics',
    image: 'https://images.unsplash.com/photo-1584982751601-97d8cb0f3f2d?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Advanced electronic stethoscope with 40x sound amplification and noise reduction.',
    description: 'Experience unparalleled acoustic clarity with our digital stethoscope. It provides up to 40x sound amplification and active noise cancellation, making it easier to hear subtle heart and lung sounds even in noisy environments. Connects via Bluetooth to companion apps for recording and analysis.',
    features: ['40x sound amplification', 'Active noise cancellation', 'Bluetooth 5.0 connectivity', 'Rechargeable battery'],
    specifications: {
      'Battery Life': 'Up to 24 hours',
      'Weight': '150g',
      'Connectivity': 'Bluetooth 5.0',
      'Warranty': '2 Years'
    }
  },
  {
    id: '4',
    name: 'Surgical Instrument Kit',
    category: 'Medical Instruments',
    image: 'https://images.unsplash.com/photo-1514416432279-50fac261c7dd?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Comprehensive set of surgical-grade stainless steel instruments for clinical procedures.',
    description: 'A versatile kit designed for minor surgical procedures. Each instrument is crafted from premium German stainless steel, ensuring durability, corrosion resistance, and precise performance. Fully autoclavable and built to withstand rigorous sterilization protocols required in modern healthcare facilities.',
    features: ['German stainless steel', 'Autoclavable up to 134°C', 'Corrosion resistant', 'Ergonomic design'],
    specifications: {
      'Material': 'Surgical Grade Stainless Steel',
      'Pieces': '15',
      'Case': 'Included (Sterilizable)',
      'Warranty': 'Lifetime (manufacturing defects)'
    }
  },
  // Dental Supplies
  {
    id: '5',
    name: 'Dental Composite Resins',
    category: 'Dental Supplies',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffbb2c8ca67?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Nano-hybrid composite resins delivering superior aesthetics and durability for dental restorations.',
    description: 'Our nano-hybrid composite resins are engineered for both anterior and posterior restorations, offering exceptional polishability, color stability, and wear resistance. The optimized filler technology enables smooth handling and reliable bonding for long-lasting, natural-looking results.',
    features: ['Nano-hybrid filler technology', 'Shade-stable, long-term color retention', 'Suitable for anterior & posterior use', 'Low polymerization shrinkage'],
    specifications: {
      'Type': 'Nano-hybrid Composite',
      'Shades Available': '20+',
      'Packaging': '4g syringes / kit',
      'Light Cure': '≥ 400-500nm'
    }
  },
  {
    id: '6',
    name: 'Dental Impression Materials',
    category: 'Dental Supplies',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'High-accuracy polyvinyl siloxane (PVS) impression materials for precise dental models.',
    description: 'Our PVS impression materials offer outstanding dimensional stability and detail reproduction, ensuring precise dental models for crowns, bridges, implants, and orthodontic work. Hydrophilic properties ensure excellent wetting even in moist environments for consistently accurate results.',
    features: ['Excellent dimensional stability', 'Hydrophilic formula', 'High tear resistance', 'Pleasant mint flavor'],
    specifications: {
      'Material': 'Polyvinyl Siloxane (PVS)',
      'Working Time': '2 min 30 sec',
      'Setting Time': '4 min',
      'Viscosities': 'Light, Regular, Heavy'
    }
  },
  {
    id: '7',
    name: 'Dental Handpiece Set',
    category: 'Dental Instruments',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'High-speed and low-speed dental handpiece set for efficient clinical procedures.',
    description: 'Precision-engineered for reliability and performance, our dental handpiece set is a cornerstone of any dental practice. The high-speed turbine delivers smooth, vibration-free cutting while the low-speed contra-angle provides excellent torque for polishing and finishing. Maintenance-free bearings ensure longevity.',
    features: ['Anti-retraction valve', 'Ceramic bearings', 'Midwest 4-hole connection', 'LED illumination (high-speed)'],
    specifications: {
      'High-Speed RPM': 'Up to 400,000 rpm',
      'Low-Speed RPM': 'Up to 40,000 rpm',
      'Connection': 'Midwest 4-hole',
      'Autoclavable': 'Yes, 134°C'
    }
  },
  // CSSD Materials
  {
    id: '8',
    name: 'Sterilization Pouches',
    category: 'CSSD Materials',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Self-sealing sterilization pouches with Class 1 & 6 chemical indicators for instrument packaging.',
    description: 'Designed for the Central Sterile Supply Department (CSSD), our self-sealing sterilization pouches provide reliable packaging for all sterilization methods including steam (autoclave), EtO, and plasma. Integrated Class 1 & 6 chemical indicators confirm exposure to sterilization conditions and cycle parameters.',
    features: ['Self-sealing closure', 'Class 1 & 6 chemical indicators', 'Compatible with all sterilization methods', 'Clear & transparent film for content visibility'],
    specifications: {
      'Material': 'Kraft Paper + PET Film',
      'Available Sizes': '5 x 10 cm to 30 x 60 cm',
      'Indicator': 'Class 1 & 6',
      'Standard': 'EN ISO 11607'
    }
  },
  {
    id: '9',
    name: 'Instrument Tracking Labels',
    category: 'CSSD Materials',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop',
    shortDescription: 'Durable autoclave-resistant labels for complete CSSD instrument traceability.',
    description: 'Our autoclave-resistant instrument tracking labels are essential for modern CSSD traceability systems. They withstand the rigors of steam sterilization cycles without delaminating or losing print legibility, ensuring reliable documentation and compliance with sterilization standards and hospital regulations.',
    features: ['Survives autoclave cycles (134°C)', 'Barcode & QR code printable', 'Permanent adhesive', 'Compliant with hospital traceability requirements'],
    specifications: {
      'Temperature Resistance': 'Up to 140°C',
      'Material': 'Polyester',
      'Adhesive': 'Permanent acrylic',
      'Format': 'Roll or sheet'
    }
  }
];

export let cmsData = {
  hero: {
    badge: "Qatar's Trusted Healthcare Partner",
    title: "Elevating Patient Care Through Premium Supplies.",
    subtitle: "BaseMed empowers hospitals, clinics, and dental practices across Qatar with high-quality medical, dental, and CSSD materials — delivered with uncompromising reliability.",
    bgImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop"
  },
  trust: {
    title: "Why Healthcare Professionals Trust BaseMed",
    subtitle: "Delivering excellence, prompt service, and personalized support to Qatar's healthcare community.",
    features: [
      {
        title: "Uncompromising Quality",
        desc: "We source exclusively from certified global manufacturers, ensuring every product meets the highest international safety and efficacy standards."
      },
      {
        title: "Prompt & Reliable Delivery",
        desc: "Our efficient logistics network guarantees timely delivery to hospitals, clinics, dental practices, and CSSD departments across all of Qatar."
      },
      {
        title: "Personalized Support",
        desc: "Our dedicated local expert team provides exceptional customer service and technical assistance tailored to the unique needs of your facility."
      }
    ]
  },
  mission: {
    quote: '"To provide high-quality medical and dental products that align with the dynamic needs of healthcare professionals in Qatar — delivering excellence, prompt service, and personalized support."'
  },
  featuredProductIds: ['1', '5', '3', '8']
};

export let contactMessages: any[] = [];
