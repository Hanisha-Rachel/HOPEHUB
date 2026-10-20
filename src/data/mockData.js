/**
 * HOPEHUB Demonstration Data Store
 * Contains curated, verified high-resolution photography URLs and realistic 
 * records for campaigns, organizations, volunteer drives, and impact metrics.
 * 
 * NOTE: All financial figures and impact counts are illustrative demonstration
 * data prepared for academic review and system testing.
 */

export const IMAGES = {
  // Hero & Storytelling Collages
  heroBanner: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80", // Children smiling / community joy
  heroSecondary: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80", // Hands offering food / grain
  heroVolunteer: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80", // Volunteers working together
  heroDoctor: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80", // Doctor checking patient
  aboutMission: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1000&q=80", // Hands joined together
  aboutVision: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80", // Community collaboration
  ctaBanner: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1400&q=80", // People walking forward in golden hour

  // Categories & Causes
  education: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80", // Classroom children with pencils
  educationDetail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80", // Books & girl studying
  foodRelief: "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=1000&q=80", // Food donation / distribution
  foodKitchen: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=1000&q=80", // Cooking for community
  healthcare: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80", // Nurse/doctor with patient
  medicalCamp: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80", // Medical checkup camp
  emergencyRelief: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80", // Emergency disaster aid
  cleanWater: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=1000&q=80", // Water well / clean water pump
  volunteering: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80", // Volunteers working together
  environment: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80", // Tree plantation drive
  clothingDrive: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80", // Clothes donation sorting
  booksDrive: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80", // Stacks of books for library
  authBackground: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=1000&q=80", // Volunteers smiling together

  // Gallery Showcase
  gallery1: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80", // Classroom smiles
  gallery2: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80", // Food relief
  gallery3: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80", // Health checkup
  gallery4: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=800&q=80", // Clean water well
  gallery5: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80", // Youth volunteers
  gallery6: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80", // Warm clothes distribution
};

export const PLATFORM_STATS = {
  livesImpacted: "148,500+",
  activeCampaigns: "42",
  verifiedNGOs: "28",
  activeVolunteers: "3,420+",
  fundsMobilized: "₹ 4.82 Cr",
  isDemonstration: true
};

export const CAMPAIGNS = [
  {
    id: 1,
    title: "Project Vidya: Digital Literacy & Books for Rural Schools",
    slug: "project-vidya-digital-literacy",
    category: "Education",
    image: IMAGES.education,
    ngoName: "Pratham Shiksha Foundation",
    ngoVerified: true,
    ngoLogo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    goal: 500000,
    raised: 385000,
    daysLeft: 14,
    donorsCount: 312,
    location: "Rajasthan & Bihar, India",
    description: "Equipping 24 rural government schools with digital learning tablets, library books, and solar study lamps to prevent high dropout rates.",
    story: "In remote villages, access to updated learning tools determines a child's future. Project Vidya sets up interactive micro-libraries and provides solar-powered learning lamps so students can study after sunset without power cuts.",
    urgency: "Medium",
    colorTheme: "from-teal-500 to-teal-700",
    updates: [
      { date: "Oct 05, 2026", title: "10 Libraries Installed", content: "First batch of solar learning tablets distributed in Alwar district schools." },
      { date: "Sep 22, 2026", title: "Campaign Launched", content: "Initial community drive organized with local panchayat." }
    ]
  },
  {
    id: 2,
    title: "NourishEveryChild: Hot Nutritional Meals for Urban Slums",
    slug: "nourisheverychild-nutritional-meals",
    category: "Food Relief",
    image: IMAGES.foodRelief,
    ngoName: "Annapurna Food Seva Trust",
    ngoVerified: true,
    ngoLogo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    goal: 350000,
    raised: 315000,
    daysLeft: 8,
    donorsCount: 540,
    location: "Mumbai & Thane, India",
    description: "Providing 1,200 daily fortified hot meals and clean drinking water to underprivileged children and daily-wage families.",
    story: "Hunger should never be a barrier to learning or health. Our central community kitchen operates at dawn to deliver fresh, hot, protein-rich khichdi and fresh fruit to urban children before morning school hours.",
    urgency: "High",
    colorTheme: "from-orange-500 to-amber-600",
    updates: [
      { date: "Oct 08, 2026", title: "Surpassed 20,000 Meals", content: "Celebrated milestone with community volunteers and fruit basket distributions." }
    ]
  },
  {
    id: 3,
    title: "Sanjeevani: Mobile Healthcare Clinics for Tribal Hamlets",
    slug: "sanjeevani-mobile-healthcare-clinics",
    category: "Healthcare",
    image: IMAGES.healthcare,
    ngoName: "Rural Health Relief Network",
    ngoVerified: true,
    ngoLogo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    goal: 850000,
    raised: 520000,
    daysLeft: 21,
    donorsCount: 228,
    location: "Wayanad & Idukki, India",
    description: "Funding two fully-equipped mobile medical vans with diagnostic kits, maternal health specialists, and emergency medicines.",
    story: "Families in hilly tribal belts often travel 35 kilometers through tough terrain just to reach an emergency doctor. Sanjeevani vans bring doctors, basic diagnostic tools, and free prenatal care straight to village doorsteps.",
    urgency: "Critical",
    colorTheme: "from-rose-500 to-red-600",
    updates: [
      { date: "Sep 28, 2026", title: "Second Medical Van Commissioned", content: "Equipped with ultrasound and basic blood testing analyzers." }
    ]
  },
  {
    id: 4,
    title: "RapidShield: Emergency Flood & Cyclone Relief Kits",
    slug: "rapidshield-emergency-flood-relief",
    category: "Disaster Relief",
    image: IMAGES.emergencyRelief,
    ngoName: "Apex Humanitarian Aid Corps",
    ngoVerified: true,
    ngoLogo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    goal: 600000,
    raised: 490000,
    daysLeft: 5,
    donorsCount: 419,
    location: "Coastal Odisha, India",
    description: "Pre-positioning 2,500 flood survival kits containing water purification drops, dry rations, emergency tarps, and first-aid kits.",
    story: "When cyclone warnings sound, every hour counts. RapidShield builds resilient pre-positioned community storehouses managed by trained local youth to deliver immediate sustenance before state rescue units arrive.",
    urgency: "Critical",
    colorTheme: "from-amber-500 to-orange-600",
    updates: [
      { date: "Oct 09, 2026", title: "500 Tarpaulins Delivered", content: "Emergency shelters erected across coastal shelters." }
    ]
  },
  {
    id: 5,
    title: "Jal Jeevan: Solar Powered Clean Water Wells",
    slug: "jal-jeevan-clean-water-wells",
    category: "Clean Water",
    image: IMAGES.cleanWater,
    ngoName: "EcoHope Earth Initiative",
    ngoVerified: true,
    ngoLogo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    goal: 400000,
    raised: 280000,
    daysLeft: 30,
    donorsCount: 195,
    location: "Bundelkhand, India",
    description: "Installing durable solar-powered groundwater pumps and biosand filtration tanks in water-scarce drought regions.",
    story: "Women and young girls walk up to 6 hours daily carrying heavy earthen water pots. By boring community borewells powered by solar panels, we restore clean drinking water and allow young girls to attend school consistently.",
    urgency: "Medium",
    colorTheme: "from-cyan-600 to-teal-700",
    updates: []
  },
  {
    id: 6,
    title: "Warmth for Winter: Blankets & Warm Clothing Drive",
    slug: "warmth-for-winter-clothing-drive",
    category: "Resource Relief",
    image: IMAGES.clothingDrive,
    ngoName: "Samarpan Seva Samiti",
    ngoVerified: true,
    ngoLogo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    goal: 250000,
    raised: 190000,
    daysLeft: 18,
    donorsCount: 160,
    location: "Delhi NCR & Shimla, India",
    description: "Distributing 3,000 thermal blankets and heavy woolen sweaters to homeless individuals and roadside pavement dwellers.",
    story: "Northern winters bring sub-zero night chills that endanger rough sleepers on city pavements. Samarpan's night rescue patrol distributes thermal fleece blankets directly to vulnerable individuals.",
    urgency: "High",
    colorTheme: "from-indigo-500 to-purple-600",
    updates: []
  }
];

export const NGOS = [
  {
    id: 1,
    name: "Pratham Shiksha Foundation",
    regNo: "NGO/DL/2018/004921",
    verified: true,
    category: "Education & Literacy",
    image: IMAGES.educationDetail,
    logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    description: "Dedicated to eliminating educational inequality across rural North India through digital learning and village libraries.",
    activeCampaigns: 4,
    totalRaised: "₹ 24.5 Lakhs",
    badgeColor: "bg-teal-50 text-hope-teal border-teal-200"
  },
  {
    id: 2,
    name: "Annapurna Food Seva Trust",
    regNo: "NGO/MH/2015/019842",
    verified: true,
    category: "Hunger Relief",
    image: IMAGES.foodKitchen,
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    description: "Operating hygienic community kitchens providing free, wholesome meals to urban laborers, children, and hospital visitors.",
    activeCampaigns: 3,
    totalRaised: "₹ 41.2 Lakhs",
    badgeColor: "bg-orange-50 text-hope-orange border-orange-200"
  },
  {
    id: 3,
    name: "Rural Health Relief Network",
    regNo: "NGO/KA/2019/077219",
    verified: true,
    category: "Healthcare Access",
    image: IMAGES.medicalCamp,
    logo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    description: "Deploying mobile medical vans, free surgical camps, and pediatric care clinics in remote tribal districts.",
    activeCampaigns: 2,
    totalRaised: "₹ 38.0 Lakhs",
    badgeColor: "bg-rose-50 text-hope-coral border-rose-200"
  },
  {
    id: 4,
    name: "Apex Humanitarian Aid Corps",
    regNo: "NGO/OD/2016/099304",
    verified: true,
    category: "Disaster Management",
    image: IMAGES.emergencyRelief,
    logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    description: "Trained first-response relief corps delivering life-saving survival supplies during floods, cyclones, and landslides.",
    activeCampaigns: 3,
    totalRaised: "₹ 55.4 Lakhs",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

export const VOLUNTEER_OPPORTUNITIES = [
  {
    id: 1,
    title: "Weekend Reading Mentor for Primary Kids",
    ngoName: "Pratham Shiksha Foundation",
    category: "Education",
    image: IMAGES.education,
    location: "Govt School No. 4, Jaipur (On-site)",
    date: "Every Saturday (10:00 AM - 1:00 PM)",
    skills: ["Patience", "Storytelling", "Hindi/English basics"],
    capacity: 12,
    applied: 8,
    description: "Spend 3 hours reading illustrated storybooks with 1st to 4th grade children to build foundational language comprehension."
  },
  {
    id: 2,
    title: "Community Kitchen Food Prep & Packing Assistant",
    ngoName: "Annapurna Food Seva Trust",
    category: "Hunger Relief",
    image: IMAGES.foodRelief,
    location: "Dharavi Kitchen Unit 2, Mumbai",
    date: "Mon to Fri (6:30 AM - 9:30 AM)",
    skills: ["Hygiene conscious", "Teamwork", "Packing"],
    capacity: 20,
    applied: 14,
    description: "Help chop fresh vegetables, pack sealed hot-meal meal boxes, and coordinate dispatch for school meal vans."
  },
  {
    id: 3,
    title: "Healthcare Camp Registration & Triage Coordinator",
    ngoName: "Rural Health Relief Network",
    category: "Healthcare",
    image: IMAGES.medicalCamp,
    location: "Community Hall, Wayanad",
    date: "Oct 25, 2026 (Full Day)",
    skills: ["Basic English/Malayalam", "Record Keeping", "Empathy"],
    capacity: 10,
    applied: 6,
    description: "Assist visiting doctors by cataloging patient tokens, directing elderly villagers to dental and optical screening stalls."
  },
  {
    id: 4,
    title: "Urban Tree Planting & Green Belt Volunteer",
    ngoName: "EcoHope Earth Initiative",
    category: "Environment",
    image: IMAGES.volunteering,
    location: "Riverfront Green Belt, Pune",
    date: "Sunday, Oct 18 (7:00 AM - 11:00 AM)",
    skills: ["Physical stamina", "Love for nature"],
    capacity: 35,
    applied: 29,
    description: "Plant native fruit trees, install biodegradable tree guards, and construct drip-irrigation water pits."
  }
];

export const IMPACT_STORIES = [
  {
    id: 1,
    name: "Sunita & Her Daughters",
    location: "Bikaner, Rajasthan",
    category: "Education Aid",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    quote: "When schools shifted to digital tablets from Project Vidya, my daughters did not have to drop out. Today, my eldest daughter wants to become a mathematics teacher.",
    impact: "Received 2 Solar Study Kits & 1 Year of Books",
    accent: "bg-teal-50 border-teal-200 text-hope-teal"
  },
  {
    id: 2,
    name: "Master Aarav's Heart Surgery",
    location: "Belagavi, Karnataka",
    category: "Medical Support",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    quote: "We could never have afforded the pediatric heart surgery alone. 410 kind strangers on HOPEHUB made it possible. Aarav is smiling and playing football again.",
    impact: "100% Medical Goal Funded in 11 Days",
    accent: "bg-rose-50 border-rose-200 text-hope-coral"
  },
  {
    id: 3,
    name: "Flood Rehabilitation at Balasore",
    location: "Balasore, Odisha",
    category: "Disaster Relief",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    quote: "When the cyclone water flooded our village, the survival ration kits reached us within 6 hours. That gave our whole community the hope to rebuild.",
    impact: "450 Families Rebuilt Homes",
    accent: "bg-orange-50 border-orange-200 text-hope-orange"
  }
];
