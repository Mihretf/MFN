import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Crown,
  UserCheck,
  Shield,
  Building2,
  BookOpen,
  Compass,
  Briefcase,
  Network,
  Globe2,
  Users,
  Award,
  Layers,
  Sparkles,
  MapPin,
  ChevronDown
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export interface LeaderMember {
  id: string;
  nameEn: string;
  nameAm: string;
  roleEn: string;
  roleAm: string;
  category: "council" | "network" | "dept";
  photoUrl?: string;
}

const LEADERS_DIRECTORY: LeaderMember[] = [
  {
    id: "l1",
    nameEn: "Pastor Dr. Tesfatsion Dawit",
    nameAm: "መጋቢ ዶ/ር ተስፋጽዮን ዳዊት",
    roleEn: "Council Member & Senior Pastor of Addis Ababa Jerusalem Local Church",
    roleAm: "የካውንስል አባል እና የአዲስ አበባ ኢየሩሳሌም አጥቢያ ዋና መጋቢ",
    category: "council",
    photoUrl: "https://res.cloudinary.com/droslno9i/image/upload/v1788707849/Screenshot_2026-09-06_181144_dfwtwg.png"
  },
  {
    id: "l2",
    nameEn: "Brother Wubliker Teklu",
    nameAm: "ወንድም ውብሊቀር ተክሉ",
    roleEn: "Council Member & General Administrator of Tele'qo LeTeweld",
    roleAm: "የካውንስል አባልና የተልዕኮ ለትውልድ ዋና አስተዳደር",
    category: "council"
  },
  {
    id: "l3",
    nameEn: "Sister Roza Shewangultu",
    nameAm: "እህት ሮዛ ሸዋንጉልቱ",
    roleEn: "Council Member & Head of Finance of Tele'qo LeTeweld",
    roleAm: "የካውንስል አባልና የተልዕኮ ለትውልድ ዋና ፋይናንስ ኃላፊ",
    category: "council"
  },
  {
    id: "l4",
    nameEn: "Pastor Daniel Niguse",
    nameAm: "ፓስተር ዳንኤል ንጉሴ",
    roleEn: "Council Head, Dean of Bible College & Adama Network Leader",
    roleAm: "የካውንስል ኃላፊ፣ የባይብል ኮሌጅ ዲን እና የአዳማ ኔትወርክ መሪ",
    category: "council"
  },
  {
    id: "l5",
    nameEn: "Pastor Paulos Hailu",
    nameAm: "ፓስተር ጳውሎስ ኃይሉ",
    roleEn: "Council Head & Nekemte Network Leader",
    roleAm: "የካውንስል ኃላፊ እና የነቀምቴ ኔትወርክ መሪ",
    category: "council"
  },
  {
    id: "l6",
    nameEn: "Sir Aynalem Merse",
    nameAm: "ሲር አይናለም መርሴ",
    roleEn: "Council Member & Burayu Network Leader",
    roleAm: "የካውንስል አባልና የቡራዩ ኔትወርክ መሪ",
    category: "council"
  },
  {
    id: "l7",
    nameEn: "Sister Aklil Girma",
    nameAm: "እህት አክሊል ግርማ",
    roleEn: "Council Member & Professional Department Leader",
    roleAm: "የካውንስል አባልና የፕሮፌሽናል ዲፓርትመንት መሪ",
    category: "council"
  },
  {
    id: "l8",
    nameEn: "Pastor Tariku Belayneh",
    nameAm: "ፓስተር ታሪኩ በላይነህ",
    roleEn: "Council Member",
    roleAm: "የካውንስል አባል",
    category: "council"
  },
  {
    id: "l9",
    nameEn: "Pastor Driba Degefa",
    nameAm: "ፓስተር ድሪባ ደገፋ",
    roleEn: "Council Member & Dire Dawa Network Leader",
    roleAm: "የካውንስል አባልና የድሬዳዋ ኔትወርክ መሪ",
    category: "council"
  },
  {
    id: "l10",
    nameEn: "Pastor Sofonias Qalbeso",
    nameAm: "ፓስተር ሶፎንያስ ቀልቤሶ",
    roleEn: "Council Member & Sawla Network Leader",
    roleAm: "የካውንስል አባልና የሳውላ ኔትወርክ መሪ",
    category: "council"
  },
  {
    id: "l11",
    nameEn: "Prophet Yared Samuel",
    nameAm: "ነብይ ያሬድ ሳሙኤል",
    roleEn: "Council Member & Head of the Healing School",
    roleAm: "የካውንስል አባልና የሂሊንግ ስኩል ኃላፊ",
    category: "council"
  },
  {
    id: "l12",
    nameEn: "Pastor Million Tegenework",
    nameAm: "ፓስተር ሚሊዮን ተገኘወርቅ",
    roleEn: "Council Member & Head of Campaign Exodus Department",
    roleAm: "የካውንስል አባልና የዘመቻ ኤክሶደስ ዲፓርትመንት ዋና ኃላፊ",
    category: "council"
  },
  {
    id: "l13",
    nameEn: "Prophet Biniyam Aboye",
    nameAm: "ነብይ ቢኒያም አቦዬ",
    roleEn: "Wolaita Sodo Network Leader",
    roleAm: "የወላይታ ሶዶ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l14",
    nameEn: "Pastor Biniyam Haile",
    nameAm: "ፓስተር ቢኒያም ኃይሌ",
    roleEn: "Bishoftu / Debre Zeit Network Leader",
    roleAm: "የቢሾፍቱ / ደብረዘይት ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l15",
    nameEn: "Pastor Israel Wondimu",
    nameAm: "ፓስተር እስራኤል ወንድሙ",
    roleEn: "Shashamene Network Leader",
    roleAm: "የሻሸመኔ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l16",
    nameEn: "Pastor Aweke Yigeremu",
    nameAm: "ፓስተር አወቀ ይገረሙ",
    roleEn: "Dilla Network Leader",
    roleAm: "የዲላ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l17",
    nameEn: "Pastor Aberash Gelebo",
    nameAm: "ፓስተር አበራሽ ገለቦ",
    roleEn: "Jinka Network Leader",
    roleAm: "የጂንካ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l18",
    nameEn: "Pastor Emebet Kabamo",
    nameAm: "ፓስተር እመቤት ካባሞ",
    roleEn: "Hosanna Network Leader",
    roleAm: "የሆሳዕና ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l19",
    nameEn: "Pastor Elizabeth Amare",
    nameAm: "ፓስተር ኤልሳቤጥ አማረ",
    roleEn: "CMC Network Leader",
    roleAm: "የሲ.ኤም.ሲ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l20",
    nameEn: "Pastor Senait Mulugeta",
    nameAm: "ፓስተር ሰናይት ሙሉጌታ",
    roleEn: "Bethel Network Leader",
    roleAm: "የቤቴል ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l21",
    nameEn: "Pastor Beyene Tekalign",
    nameAm: "ፓስተር በየነ ተካልኝ",
    roleEn: "Jimma Network Leader",
    roleAm: "የጅማ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l22",
    nameEn: "Pastor Eyob Alemu",
    nameAm: "ፓስተር ኢዮብ ዓለሙ",
    roleEn: "Salem Network Leader",
    roleAm: "የሳይለም ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l23",
    nameEn: "Pastor Tesfaye Regasa",
    nameAm: "ፓስተር ተስፋዬ ረጋሳ",
    roleEn: "Asella Network Leader",
    roleAm: "የአሰላ ኔትወርክ መሪ",
    category: "network"
  },
  {
    id: "l24",
    nameEn: "Pastor Solomon Buraqa",
    nameAm: "ፓስተር ሰለሞን ቡራቃ",
    roleEn: "Arba Minch Coordination Center Leader",
    roleAm: "አርባምንጭ ማስተባበሪያ ማዕከል መሪ",
    category: "network"
  },
  {
    id: "l25",
    nameEn: "Pastor Zacharias Bayu",
    nameAm: "ፓስተር ዘካሪያስ ባዩ",
    roleEn: "Assistant Pastor of Jerusalem Local Church",
    roleAm: "የኢየሩሳሌም አጥቢያ ረዳት ፓስተር",
    category: "dept"
  },
  {
    id: "l26",
    nameEn: "Pastor Surafel Tefera",
    nameAm: "ፓስተር ሱራፌል ተፈራ",
    roleEn: "Head of Evangelism Dept & President of Ethiopian Evangelists Association",
    roleAm: "የወንጌል ዲፓርትመንት ኃላፊና የኢትዮጵያ የወንጌል ማህበርተኞች ፕሬዚዳንት",
    category: "dept"
  },
  {
    id: "l27",
    nameEn: "Pastor Hana Getachew",
    nameAm: "ፓስተር ሀና ጌታቸው",
    roleEn: "Head of Intercession Department",
    roleAm: "የምልጃ ዲፓርትመንት ኃላፊ",
    category: "dept"
  },
  {
    id: "l28",
    nameEn: "Youth Prophet Nebiyu Samuel",
    nameAm: "ወጣት ነብዩ ሳሙኤል",
    roleEn: "National Youth Ministry Leader",
    roleAm: "አገር አቀፍ የወጣቶች አገልግሎት ኃላፊ",
    category: "dept"
  },
  {
    id: "l29",
    nameEn: "Teacher Endale Chala",
    nameAm: "አስተማሪ እንዳለ ጫላ",
    roleEn: "Secretary of Network Coordination Office, Head of Planning & Monitoring",
    roleAm: "የኔትወርኮች ማስተባበሪያ ቢሮ ፀሐፊ፣ የእቅድና ክትትል ክፍል ኃላፊ እና የኢየሩሳሌም አጥቢያ አስተዳደር",
    category: "dept"
  },
  {
    id: "l30",
    nameEn: "Teacher Biniyam Gebrehiwot",
    nameAm: "አስተማሪ ቢኒያም ገ/ህይወት",
    roleEn: "Network Coordination Office & Jerusalem Local Church Finance",
    roleAm: "የኔትወርኮች ማስተባበሪያ ቢሮና የኢየሩሳሌም አጥቢያ ፋይናንስ",
    category: "dept"
  },
  {
    id: "l31",
    nameEn: "Worship Leader Beki Kebede",
    nameAm: "ዘማሪ ቤኪ ከበደ",
    roleEn: "National & Jerusalem Local Church Choir & Worship Leader",
    roleAm: "አገር አቀፍና የኢየሩሳሌም አጥቢያ የዘማሪዎችና የመዘምራን ኃላፊ",
    category: "dept"
  },
  {
    id: "l32",
    nameEn: "Brother Yonas Alemayehu",
    nameAm: "ወንድም ዮናስ አለማየሁ",
    roleEn: "National Head of Construction Affairs",
    roleAm: "አገር አቀፍ የግንባታ ጉዳይ ኃላፊ",
    category: "dept"
  },
  {
    id: "l33",
    nameEn: "Pastor Daniel Hailu",
    nameAm: "ፓስተር ዳንኤል ኃይሉ",
    roleEn: "Tepi Network Leader",
    roleAm: "የቴፒ ኔትወርክ ዋና መሪ",
    category: "network"
  },
  {
    id: "l34",
    nameEn: "Pastor Yoseph Amerga",
    nameAm: "ፓስተር ዮሴፍ አመርጋ",
    roleEn: "Assistant Leader of Bethel Network",
    roleAm: "የቤቴል ኔትወርክ ረዳት መሪ",
    category: "network"
  }
];

const LOCAL_NETWORKS = [
  { en: "Addis Ababa Jerusalem Branch (Main Church)", am: "አዲስ አበባ ኢየሩሳሌም አጥቢያ (ዋናው ቤተ ክርስቲያን)" },
  { en: "Adama (Nazreth) Network Center", am: "አዳማ (ናዝሬት) ኔትወርክ ማዕከል" },
  { en: "Debre Zeit (Bishoftu) Network Center", am: "ደብረ ዘይት (ቢሾፍቱ) ኔትወርክ ማዕከል" },
  { en: "Ayat Network Center", am: "አያት ኔትወርክ ማዕከል" },
  { en: "Bethel Network Center", am: "ቤቴል ኔትወርክ ማዕከል" },
  { en: "Burayu Network Center", am: "ቡራዩ ኔትወርክ ማዕከል" },
  { en: "Shashemene Network Center", am: "ሻሸመኔ ኔትወርክ ማዕከል" },
  { en: "Hossana Network Center", am: "ሆሳዕና ኔትወርክ ማዕከል" },
  { en: "Dila Network Center", am: "ዲላ ኔትወርክ ማዕከል" },
  { en: "Sawla Network Center", am: "ሳውላ ኔትወርክ ማዕከል" },
  { en: "Jinka Network Center", am: "ጂንካ ኔትወርክ ማዕከል" },
  { en: "Jimma Network Center", am: "ጅማ ኔትወርክ ማዕከል" },
  { en: "Wolaita Sodo Network Center", am: "ወላይታ ሶዶ ኔትወርክ ማዕከል" },
  { en: "Arbaminch Network Center", am: "አርባ ምንጭ ኔትወርክ ማዕከል" },
  { en: "Tepi Network Center", am: "ቴፒ ኔትወርክ ማዕከል" },
  { en: "Saylem Network Center", am: "ሳይለም ኔትወርክ ማዕከል" },
  { en: "Dire Dawa Network Center", am: "ድሬዳዋ ኔትወርክ ማዕከል" },
  { en: "Nekemte Network Center", am: "ነቀምቴ ኔትወርክ ማዕከል" },
];

const INT_CHURCHES = [
  { en: "North Sudan (Khartoum)", am: "ሰሜን ሱዳን (ካርቱም)" },
  { en: "United Arab Emirates (Dubai)", am: "ተባበሩት አረብ ኤምሬትስ (ዱባይ)" },
  { en: "Turkey (Istanbul)", am: "ቱርክ (ኢስታንቡል)" },
  { en: "Denmark (Copenhagen)", am: "ዴንማርክ (ኮፐንሃገን)" },
  { en: "Sweden (Stockholm)", am: "ስዊድን (ስቶክሆልም)" },
  { en: "United States (Las Vegas)", am: "አሜሪካ (ላስ ቬጋስ)" }
];

const MINISTRY_TEAMS = [
  { en: "Worship & Choir Ministries", am: "የዘማሪዎችና የመዘምራን አገልግሎት" },
  { en: "Mothers' Choir", am: "የእናቶች መዘምራን" },
  { en: "Prayer Ministry", am: "የጸሎት አገልግሎት" },
  { en: "Intercession Ministry", am: "የምልጃ አገልግሎት" },
  { en: "Prophetic Ministry", am: "የነቢይነት አገልግሎት" },
  { en: "Teaching Ministry", am: "የትምህርት አገልግሎት" },
  { en: "Deacons Ministry", am: "የዲያቆናት አገልግሎት" },
  { en: "Home Cell Ministry", am: "የቤት ለቤት ጸሎትና ሕብረት (ሴል)" },
  { en: "Youth Ministry", am: "የወጣቶች አገልግሎት" },
  { en: "Teenagers Ministry", am: "የታዳጊዎች አገልግሎት" },
  { en: "Children's Ministry", am: "የሕፃናት አገልግሎት" },
  { en: "Practical Christianity Ministry", am: "የተግባራዊ ክርስትና አገልግሎት" },
  { en: "Gospel Outreach Ministry", am: "የጀማ ወንጌል ስርጭት" },
  { en: "Visitors Ministry", am: "የእንግዶች ተቀባይ አገልግሎት" },
  { en: "Media Ministry (24h TV)", am: "የሚዲያ አገልግሎት (24 ሰዓት)" },
  { en: "Technical & Sound Ministry", am: "የቴክኒክና ሳውንድ አገልግሎት" },
  { en: "Football & Sports Ministry", am: "የእግር ኳስና ስፖርት አገልግሎት" },
  { en: "Literature & Theatre Ministry", am: "የስነ-ጽሑፍና ቴአትር አገልግሎት" },
  { en: "Business & Economic Ministry", am: "የቢዝነስና ኢኮኖሚ አገልግሎት" },
  { en: "Pastoral & Eldership Staff", am: "የመጋቢዎችና የሽማግሌዎች አካል" },
  { en: "Specialized Outreach Ministries", am: "ልዩ ልዩ የዘመቻ አገልግሎቶች" }
];

const EXCELLENCE_AREAS = [
  {
    titleEn: "Worship Services",
    titleAm: "የአምልኮ አገልግሎት",
    objectiveEn: "Make worship more engaging and spiritually enriching by improving how services are prepared and delivered.",
    objectiveAm: "የአምልኮ አገልግሎቶችን የበለጠ አሳታፊና በመንፈስ የሚያበለጽጉ ለማድረግ ዝግጅታቸውንና አፈጻጸማቸውን ማሻሻል።",
    tasksEn: [
      "Prepare training for worship leaders.",
      "Coordinate appropriate encouragement and recognition for worship team members.",
      "Help provide the resources needed for worship services.",
      "Invite and coordinate servers, including preparation and decoration of the platform.",
    ],
    tasksAm: [
      "ለአምልኮ መሪዎች ስልጠና ማዘጋጀት።",
      "ለአምልኮ ቡድን አባላት ማበረታቻና እውቅና እንዲዘጋጅ ማስተባበር።",
      "ለአምልኮ አገልግሎት የሚያስፈልጉ ግብዓቶች እንዲሟሉ ማገዝ።",
      "አገልጋዮችን መጋበዝና የመድረክ ዝግጅትና ማስዋብ ሥራን ማስተባበር።",
    ],
  },
  {
    titleEn: "Media Quality & Access",
    titleAm: "የሚዲያ ጥራትና ተደራሽነት",
    objectiveEn: "Strengthen audio-visual services and use digital platforms to share meaningful content with members and the wider community.",
    objectiveAm: "የኦዲዮ-ቪዥዋል አገልግሎትን ማሻሻልና በዲጂታል መድረኮች አማካኝነት ለአባላትና ለሰፊው ማኅበረሰብ የሚደርስ ተፅዕኖ ፈጣሪ ይዘት ማቅረብ።",
    tasksEn: [
      "Help provide the equipment and resources needed for media services.",
      "Establish an organized media team and expand the effective use of social media.",
      "Arrange media education and practical training programs.",
    ],
    tasksAm: [
      "ለሚዲያ አገልግሎት የሚያስፈልጉ ግብዓቶች እንዲሟሉ ማገዝ።",
      "የተደራጀ የሚዲያ ቡድን ማቋቋምና የማኅበራዊ ሚዲያ አጠቃቀምን ማሳደግ።",
      "የሚዲያ ትምህርትና ተግባራዊ ስልጠናዎችን ማዘጋጀት።",
    ],
  },
  {
    titleEn: "Spiritual Programs & Counsel",
    titleAm: "የመንፈሳዊ ፕሮግራሞች አስተዳደርና ምክክር",
    objectiveEn: "Coordinate well-planned, inclusive church programs and consult spiritual leaders so implementation reflects the congregation's needs and the church's vision.",
    objectiveAm: "ሁሉን አሳታፊና በጥሩ ሁኔታ የታቀዱ የቤተ ክርስቲያን ፕሮግራሞችን ማስተባበር፤ አፈጻጸማቸውም የጉባኤውን ፍላጎትና የቤተ ክርስቲያኗን ራዕይ እንዲያንጸባርቅ ከመንፈሳዊ መሪዎች ጋር መምከር።",
    tasksEn: [
      "Assist with planning and delivering regular and special programs for children, youth, families, and guest ministers.",
      "Prepare contingency plans for program changes and coordinate feedback from the congregation and servers.",
      "Consult spiritual leaders on feedback, concerns, and practical improvements, then follow up on agreed actions.",
      "Train servers in the church's core vision principles and service ethics.",
      "Coordinate service-team manuals and guidelines and support their use.",
    ],
    tasksAm: [
      "ለልጆች፣ ለወጣቶች፣ ለቤተሰቦችና ለተጋባዥ አገልጋዮች የሚዘጋጁ መደበኛና ልዩ ፕሮግራሞችን ለማቀድና ለማስፈጸም ማገዝ።",
      "ለፕሮግራም ለውጦች ተለዋጭ ዕቅድ ማዘጋጀት፤ ከጉባኤውና ከአገልጋዮች ግብረመልስ ማሰባሰብ።",
      "በተሰበሰቡ አስተያየቶችና ቅሬታዎች ላይ ከመንፈሳዊ መሪዎች ጋር የመፍትሔ እርምጃዎችን ማቀድና ክትትል ማድረግ።",
      "አገልጋዮችን በራዕዩ መሠረታዊ መርሆችና በአገልግሎት ሥነ-ምግባር ማሰልጠን።",
      "የአገልግሎት ቡድኖች ማንዋሎችና መመሪያዎች እንዲዘጋጁና እንዲተገበሩ ማስተባበር።",
    ],
  },
  {
    titleEn: "Institutional Administration",
    titleAm: "ተቋማዊ አስተዳደር",
    objectiveEn: "Improve administrative and property-management systems so church operations support reliable, effective service delivery.",
    objectiveAm: "የቤተ ክርስቲያን ሥራዎች የተሳለጠና ውጤታማ አገልግሎት እንዲደግፉ የአስተዳደርና የንብረት አያያዝ ሥርዓቶችን ማሻሻል።",
    tasksEn: [
      "Review the church's institutional structure and administrative guidelines.",
      "Coordinate the preparation and implementation of administrative manuals and procedures.",
      "Assess administrative staffing needs and support appropriate organization of responsibilities.",
      "Learn from effective administrative practices and adapt them to the church's vision and context.",
    ],
    tasksAm: [
      "የቤተ ክርስቲያኗን ተቋማዊ መዋቅርና የአስተዳደር መመሪያዎች መከለስ።",
      "የአስተዳደር ማንዋሎችና ሂደቶች እንዲዘጋጁና እንዲተገበሩ ማስተባበር።",
      "የአስተዳደር የሰው ኃይል ፍላጎቶችን መገምገምና ኃላፊነቶች በተገቢው እንዲደራጁ ማገዝ።",
      "ውጤታማ ከሆኑ የአስተዳደር ልምዶች በመማር ከቤተ ክርስቲያኗ ራዕይና ሁኔታ ጋር አጣጥሞ መተግበር።",
    ],
  },
  {
    titleEn: "Membership & Serving",
    titleAm: "አባልነትና አገልጋይነት",
    objectiveEn: "Encourage active participation, welcome new members, and strengthen a sense of belonging and fellowship across the congregation.",
    objectiveAm: "ንቁ ተሳትፎን ማበረታታት፣ አዳዲስ አባላትን በእንግድነት መቀበል፣ በጉባኤው ውስጥም የቤተሰባዊነትና የኅብረት ስሜትን ማጠናከር።",
    tasksEn: [
      "Design and coordinate strategies for welcoming and connecting new members.",
      "Develop member follow-up approaches that foster lasting relationships and a sense of belonging.",
      "Encourage volunteer participation and active service within the church.",
    ],
    tasksAm: [
      "አዳዲስ አባላትን ለመቀበልና ከጉባኤው ጋር ለማገናኘት ስልቶችን መቅረጽና ማስተባበር።",
      "ዘላቂ ግንኙነትንና የባለቤትነት ስሜትን የሚያጠናክሩ የአባላት ክትትል ሂደቶችን ማዘጋጀት።",
      "የበጎ ፈቃድ ተሳትፎንና በቤተ ክርስቲያን ውስጥ ንቁ አገልግሎትን ማበረታታት።",
    ],
  },
];

const TEAM_ENABLERS = [
  {
    en: "Invite capable people who understand the church's vision and are ready to serve.",
    am: "ስለ ቤተ ክርስቲያኗ ራዕይ የተረዱና ለማገልገል ዝግጁ የሆኑ ብቁ ሰዎችን መጋበዝ።",
  },
  {
    en: "Work with spiritual leaders to identify service areas that need improvement.",
    am: "ማሻሻያ የሚፈልጉ የአገልግሎት ዘርፎችን ለመለየት ከመንፈሳዊ መሪዎች ጋር መተባበር።",
  },
  {
    en: "Use feedback systems, such as surveys, to understand satisfaction and improve services.",
    am: "እርካታን ለመረዳትና አገልግሎቶችን ለማሻሻል እንደ ዳሰሳ ጥናት ያሉ የግብረመልስ ሥርዓቶችን መጠቀም።",
  },
  {
    en: "Schedule regular consultations with spiritual leaders to stay aligned with the church's vision.",
    am: "ከቤተ ክርስቲያኗ ራዕይ ጋር የተጣጣመ ሥራ ለማከናወን ከመንፈሳዊ መሪዎች ጋር መደበኛ ምክክር ማድረግ።",
  },
];

const TEAM_OUTCOMES = [
  { en: "More vibrant and engaging worship services", am: "የበለጠ ንቁና አሳታፊ የአምልኮ አገልግሎቶች" },
  { en: "Stronger media quality and wider outreach", am: "የተሻለ የሚዲያ ጥራትና ሰፊ ተደራሽነት" },
  { en: "Better coordinated church programs", am: "የተሻለ ቅንጅት ያላቸው የቤተ ክርስቲያን ፕሮግራሞች" },
  { en: "Stronger administrative systems and service delivery", am: "የተጠናከሩ የአስተዳደር ሥርዓቶችና የአገልግሎት አሰጣጥ" },
  { en: "Increased active membership and volunteer service", am: "የንቁ አባላትና የበጎ ፈቃደኛ አገልጋዮች ተሳትፎ መጨመር" },
];

const TEAM_NEXT_STEPS = [
  { en: "Present this concept note to church leadership.", am: "ይህንን የፅንሰ ሐሳብ ማስታወሻ ለቤተ ክርስቲያን አመራር ማቅረብ።" },
  { en: "Organize the team and confirm its members.", am: "ቡድኑን ማደራጀትና አባላቱን ማረጋገጥ።" },
  { en: "Prepare a detailed implementation timeline.", am: "ዝርዝር የአፈጻጸም የጊዜ ሰሌዳ ማዘጋጀት።" },
];

export function OrgStructure() {
  const { i18n } = useTranslation();
  const isAm = i18n.language === "am";
  const [activeExcellenceArea, setActiveExcellenceArea] = useState(0);

  return (
    <section className="py-20 bg-[#FAF8F5] text-[#2C2A28] relative overflow-hidden transition-colors">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#F7E7CE]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 pb-8 border-b border-[#AE8F05]/20">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-[#AE8F05]/30 shadow-sm mb-3">
              <Sparkles className="w-4 h-4 text-[#AE8F05]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#AE8F05]">
                {isAm ? "የተቋማዊ መዋቅር እና የአገልግሎት ማዕከላት" : "Institutional Structure & Global Directory"}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2C2A28]">
              {isAm ? "የተልዕኮ ለትውልድ ቤተ ክርስቲያን መዋቅር" : "Organizational Structure & Governance"}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#5C5854] max-w-2xl">
              {isAm 
                ? "ከሐዋርያዊ አመራር እስከ 130+ አጥቢያዎች እና ዓለም አቀፍ ማዕከላት ያለዉ የተቀናጀ የመዋቅር ፍሰት" 
                : "Sequential flow from Divine Vision & Apostolic Leadership to 130+ Global Local Assemblies and Specialized Ministries."}
            </p>
          </div>
        </div>

        {/* SECTION 1: Leadership & Administrative Hierarchy */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text uppercase tracking-wider">
              {isAm ? "ክፍል 1: ሐዋርያዊ እና አስተዳደራዊ መዋቅር" : "Section 1: Leadership & Administrative Hierarchy"}
            </h3>
            <div className="w-24 h-1 bg-[#AE8F05] mx-auto mt-3 rounded-full" />
          </div>

          <div className="relative max-w-4xl mx-auto space-y-12">
            
            {/* Connecting Line */}
            <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-[#D4AF37] via-[#AE8F05] to-[#7E6503] opacity-30 rounded-full z-0 hidden md:block" />

            {/* Root: GOD */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 max-w-md mx-auto"
            >
              <div className="bg-white rounded-3xl p-6 text-center border-2 border-[#D4AF37] shadow-xl hover:scale-[1.02] transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#AE8F05] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Crown className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#AE8F05] block">DIVINE AUTHORITY</span>
                <h4 className="font-serif text-2xl font-black text-[#2C2A28] mt-1">
                  {isAm ? "እግዚአብሔር (የመለኮት ጥሪ እና ራዕይ)" : "GOD (Divine Calling and Vision)"}
                </h4>
                <p className="text-xs text-[#5C5854] mt-2 font-medium">
                  {isAm ? "የአገልግሎቱ ባለቤት፣ ምንጭ እና መሪ" : "The Supreme Sovereign Head and Vision Giver of Mission for Nation"}
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center text-[#AE8F05]">
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* Tier 2: Founder & Apostle */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative z-10 max-w-lg mx-auto"
            >
              <div className="bg-white rounded-3xl p-6 md:p-8 text-center border border-[#AE8F05]/30 shadow-xl hover:scale-[1.02] transition-transform">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#D4AF37] shadow-md">
                  <ImageWithFallback
                    src="https://res.cloudinary.com/di5zfjqlt/image/upload/v1773571945/photo_2026-03-15_13-51-33_rus4x4.jpg"
                    alt="Apostle Dr. Zelalem Getachew"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#AE8F05] px-3 py-1 rounded-full bg-[#FAF5E6] border border-[#AE8F05]/20 inline-block">
                  FOUNDER & VISIONARY APOSTLE
                </span>
                <h4 className="font-serif text-2xl font-extrabold text-[#2C2A28] mt-3">
                  {isAm ? "ባለራዕይ ሐዋርያ (ሐዋርያ ዶ/ር ዘለአለም ጌታቸው)" : "Apostle Dr. Zelalem Getachew"}
                </h4>
                <p className="text-xs text-[#5C5854] mt-2 font-medium">
                  {isAm ? "የተልዕኮ ለትውልድ መሥራች እና ዋና መሪ (President of EVCF, ECGBC Exec)" : "Founder & General Overseer (President of EVCF, Executive Member of ECGBC)"}
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center text-[#AE8F05]">
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* Tier 3: Apostolic Council */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 max-w-xl mx-auto"
            >
              <div className="bg-white rounded-3xl p-6 text-center border border-[#AE8F05]/30 shadow-lg hover:scale-[1.02] transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF5E6] text-[#AE8F05] border border-[#AE8F05]/20 flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#AE8F05]">HIGHEST GOVERNING BODY</span>
                <h4 className="font-serif text-xl font-bold text-[#2C2A28] mt-1">
                  {isAm ? "ሐዋርያዊ ቡድን / ካውንስል (12 አባላት)" : "Apostolic Council (12 Key Executive Members)"}
                </h4>
                <p className="text-xs text-[#5C5854] mt-1">
                  {isAm ? "ስልታዊ መምሪያ፣ የዶክትሪንና የፖሊሲ ውሳኔ ሰጪ አካል" : "Strategic Directive Body overseeing Doctrine, Global Missions & Governance"}
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center text-[#AE8F05]">
              <ChevronDown className="w-6 h-6" />
            </div>

            {/* Tier 4: 4 Main Pillars Grid */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <div className="bg-white rounded-2xl p-5 text-center border border-[#EAE6DE] hover:border-[#D4AF37] hover:scale-[1.02] transition-all shadow-sm">
                <Building2 className="w-8 h-8 text-[#AE8F05] mx-auto mb-3" />
                <h5 className="font-serif font-bold text-base text-[#2C2A28]">
                  {isAm ? "ቤተክርስቲያን ማዕከል" : "Church Ministry Center"}
                </h5>
                <p className="text-[11px] text-[#5C5854] mt-2">
                  {isAm ? "የአምልኮ፣ የቃል እና የምእመናን እረኝነት ማዕከል" : "Local Assemblies, Worship & Pastoral Care"}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 text-center border border-[#EAE6DE] hover:border-[#D4AF37] hover:scale-[1.02] transition-all shadow-sm">
                <BookOpen className="w-8 h-8 text-[#AE8F05] mx-auto mb-3" />
                <h5 className="font-serif font-bold text-base text-[#2C2A28]">
                  {isAm ? "የመጽሐፍ ቅዱስ ኮሌጅ" : "Bible College"}
                </h5>
                <p className="text-[11px] text-[#5C5854] mt-2">
                  {isAm ? "የአዳማ እና ነቀምቴ ሁለገብ ኮሌጆች" : "Adama & Nekemte Multipurpose Theological Colleges"}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 text-center border border-[#EAE6DE] hover:border-[#D4AF37] hover:scale-[1.02] transition-all shadow-sm">
                <Compass className="w-8 h-8 text-[#AE8F05] mx-auto mb-3" />
                <h5 className="font-serif font-bold text-base text-[#2C2A28]">
                  {isAm ? "የጀማ ወንጌል እና የነብያት ማሰልጠኛ" : "Gospel Outreach & Prophetic Training"}
                </h5>
                <p className="text-[11px] text-[#5C5854] mt-2">
                  {isAm ? "ወንጌል ስርጭት እና የነብያት ትምህርት ቤት" : "Evangelistic Campaigns & Prophetic School"}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 text-center border border-[#EAE6DE] hover:border-[#D4AF37] hover:scale-[1.02] transition-all shadow-sm">
                <Briefcase className="w-8 h-8 text-[#AE8F05] mx-auto mb-3" />
                <h5 className="font-serif font-bold text-base text-[#2C2A28]">
                  {isAm ? "የቢዝነስ ማዕከል" : "Business Center"}
                </h5>
                <p className="text-[11px] text-[#5C5854] mt-2">
                  {isAm ? "ፋይናንስ፣ ልማት እና ዘበንዊ ፕሮጀክቶች" : "Financial Systems, Assets & Development"}
                </p>
              </div>
            </motion.div>

            {/* Tier 5 Cascade Flow */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative z-10 bg-white rounded-3xl p-6 md:p-8 border border-[#EAE6DE] shadow-lg text-center"
            >
              <h4 className="font-serif text-lg font-bold text-[#2C2A28] mb-4">
                {isAm ? "የኔትወርክ ማዕከላት አስተዳደር ፍሰት (Cascade Flow)" : "Operational Cascade Flow"}
              </h4>
              <div className="flex flex-col items-center justify-center gap-3 text-xs font-semibold w-full">
                <div className="w-full max-w-md px-4 py-3 rounded-xl bg-[#FAF8F5] text-[#AE8F05] border border-[#AE8F05]/20 shadow-sm">
                  {isAm ? "1. የኔትወርክ ማዕከላት ማስተባበሪያ ቢሮ" : "1. Network Centers Coordination Office"}
                </div>
                <ChevronDown className="w-5 h-5 text-[#AE8F05]" />
                <div className="w-full max-w-md px-4 py-3 rounded-xl bg-[#FAF8F5] text-[#AE8F05] border border-[#AE8F05]/20 shadow-sm">
                  {isAm ? "2. የኔትወርክ ማዕከላት መሪዎች" : "2. Network Center Leaders"}
                </div>
                <ChevronDown className="w-5 h-5 text-[#AE8F05]" />
                <div className="w-full max-w-md px-4 py-3 rounded-xl bg-[#FAF8F5] text-[#AE8F05] border border-[#AE8F05]/20 shadow-sm">
                  {isAm ? "3. የአጥቢያ መሪዎችና መጋቢዎች" : "3. Branch Pastors & Local Leaders"}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* SECTION 2: Global Network & Ministries Directory */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text uppercase tracking-wider">
              {isAm ? "ክፍል 2: አገር አቀፍና ዓለም አቀፍ የአገልግሎት ማውጫ" : "Section 2: Global Network & Ministries Directory"}
            </h3>
            <div className="w-24 h-1 bg-[#AE8F05] mx-auto mt-3 rounded-full" />
          </div>

          {/* Subsection C Milestone Banner */}
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
            className="mb-16 rounded-3xl p-8 bg-gradient-to-r from-[#D4AF37] via-[#AE8F05] to-[#7E6503] text-white shadow-2xl text-center relative overflow-hidden"
          >
            <Award className="w-12 h-12 mx-auto mb-3 text-white drop-shadow-md" />
            <h4 className="font-serif text-3xl sm:text-5xl font-black tracking-tight">
              {isAm ? "130+ አጥቢያ ቤተክርስቲያናት በ16 ማዕከላት" : "130+ Local Churches Across 16 Network Centers"}
            </h4>
            <p className="mt-3 text-sm sm:text-base text-white/90 font-medium max-w-3xl mx-auto">
              {isAm 
                ? "በኢትዮጵያ፣ አፍሪካ፣ መካከለኛ ምስራቅ፣ አውሮፓ እና አሜሪካ የተዘረጉ የበለጸጉ አጥቢያዎች እና 350+ የሙሉ ጊዜ አገልጋዮች"
                : "Spanning Ethiopia, Africa, the Middle East, Europe, and North America with over 350+ full-time ministers & 150+ volunteer professionals."}
            </p>
          </motion.div>

          {/* Grid Layout: Local Networks & International Churches */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Subsection A: Local Network Centers (All 18) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-[#EAE6DE] shadow-xl">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#AE8F05]/20">
                <Network className="w-6 h-6 text-[#AE8F05]" />
                <h4 className="font-serif text-xl font-bold text-[#2C2A28]">
                  {isAm ? "ሀገር ውስጥ የኔትወርክ ማዕከላት (18)" : "Local Regional Network Centers (18)"}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LOCAL_NETWORKS.map((loc, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE6DE] hover:border-[#D4AF37] hover:bg-white hover:shadow-sm transition-all">
                    <MapPin className="w-4 h-4 text-[#AE8F05] flex-shrink-0" />
                    <span className="text-xs font-semibold text-[#2C2A28]">
                      {isAm ? loc.am : loc.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subsection B: International Churches */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border border-[#EAE6DE] shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#AE8F05]/20">
                  <Globe2 className="w-6 h-6 text-[#AE8F05]" />
                  <h4 className="font-serif text-xl font-bold text-[#2C2A28]">
                    {isAm ? "ዓለም አቀፍ አጥቢያዎች" : "International Branches"}
                  </h4>
                </div>

                <div className="space-y-3">
                  {INT_CHURCHES.map((ch, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE6DE] hover:border-[#D4AF37] hover:bg-white transition-colors">
                      <div className="flex items-center space-x-3">
                        <Globe2 className="w-4 h-4 text-[#AE8F05]" />
                        <span className="text-xs font-bold text-[#2C2A28]">
                          {isAm ? ch.am : ch.en}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF5E6] text-[#AE8F05] border border-[#AE8F05]/20">
                        Active Branch
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subsection E: Final Assembly */}
              <div className="mt-8 pt-6 border-t border-[#AE8F05]/20 bg-[#FAF8F5] p-4 rounded-2xl text-center border border-[#EAE6DE]">
                <Users className="w-6 h-6 text-[#AE8F05] mx-auto mb-1" />
                <h5 className="font-serif font-bold text-sm text-[#2C2A28]">
                  {isAm ? "ጉባኤ (ምዕመናን - እስራኤል)" : "General Assembly (\"Gubaé\" / Israel)"}
                </h5>
                <p className="text-[11px] text-[#5C5854] mt-1">
                  {isAm ? "የመላው ምዕመናን እና የክርስቶስ አካል የመጨረሻ መሰብሰቢያ" : "The Collective Congregation & Sovereign Body of Believers"}
                </p>
              </div>
            </div>
          </div>

          {/* Subsection D: Excellence & Ministry Teams */}
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#EAE6DE] shadow-xl mb-16">
            <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-[#AE8F05]/20">
              <Layers className="w-7 h-7 text-[#AE8F05]" />
              <div>
                <h4 className="font-serif text-2xl font-bold text-[#2C2A28]">
                  {isAm ? "የልህቀት ማዕከላት እና የአገልግሎት ክፍል ቡድኖች" : "Excellence Teams & Ministry Departments"}
                </h4>
                <p className="text-xs text-[#5C5854] mt-1">
                  {isAm ? "በየዘርፉ የተሰማሩ የልህቀት ማዕከላትና የበጎ ፈቃድ ባለሙያዎች" : "Over 20 Specialized Ministerial Teams & 150+ Volunteer Professionals"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {MINISTRY_TEAMS.map((team, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DE] hover:border-[#D4AF37] hover:bg-white hover:scale-[1.02] transition-all flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#AE8F05] flex-shrink-0" />
                  <span className="text-xs font-bold text-[#2C2A28]">
                    {isAm ? team.am : team.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Church Ministry Excellence Team Concept Note */}
          <motion.section
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 28 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-20 scroll-mt-24"
            aria-labelledby="excellence-team-title"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#173A32] text-white shadow-2xl">
              <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#AE8F05]/20 to-transparent pointer-events-none" />
              <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 p-7 sm:p-10 lg:p-14 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/50 bg-white/5 text-[#F0D082] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    {isAm ? "ለማቋቋም የቀረበ የፅንሰ ሐሳብ ማስታወሻ" : "Proposed Establishment Framework"}
                  </div>
                  <h3 id="excellence-team-title" className="mt-5 font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                    {isAm ? "የቤተ ክርስቲያን አገልግሎት ልህቀት ቡድን" : "Church Ministry Excellence Team"}
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-white/80">
                    {isAm
                      ? "በመንፈሳዊ እድገትና በኅብረት ላይ ያተኮረ፣ የአገልግሎቶችን ጥራት ለማሳደግ የቀረበ የቡድን ማቋቋሚያና የአሠራር ማዕቀፍ። ቡድኑ የአገልግሎት አካላትን፣ አቅርቦቶችንና አስተዳደርን በማስተባበር እያንዳንዱ ፕሮግራም መንፈሳዊ ዓላማውን የጠበቀ፣ አሳታፊና ራዕይ ተኮር እንዲሆን ለማገዝ የታሰበ ነው።"
                      : "A proposed framework for strengthening service quality, spiritual growth, and fellowship. The team would coordinate service groups, resources, and administration so that every program remains spiritually purposeful, inclusive, and aligned with the church's vision."}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {[
                      isAm ? "መንፈሳዊ እድገት" : "Spiritual growth",
                      isAm ? "የአገልግሎት ጥራት" : "Service quality",
                      isAm ? "ኅብረትና ተሳትፎ" : "Fellowship & participation",
                    ].map((label) => (
                      <span key={label} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white/90">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <figure className="overflow-hidden rounded-2xl border border-white/20 bg-[#102C26] p-2 shadow-xl">
                    <img
                      src="/excellence.jpg"
                      alt={isAm ? "የአገልግሎት ልህቀት" : "Church ministry excellence"}
                      className="h-56 sm:h-64 lg:h-72 w-full rounded-xl object-contain"
                      loading="lazy"
                    />
                    <figcaption className="px-3 pt-2 pb-1 text-xs font-semibold text-white/70">
                      {isAm ? "የአገልግሎት ልህቀት ቡድን" : "Church Ministry Excellence Team"}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>

            <div className="mt-14 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#AE8F05]">
                {isAm ? "የቡድኑ ዝርዝር ዓላማዎች" : "The Proposed Framework"}
              </span>
              <h4 className="mt-2 font-serif text-2xl sm:text-3xl font-extrabold text-[#2C2A28]">
                {isAm ? "አምስቱ የትኩረት ዘርፎች" : "Five Areas of Focus"}
              </h4>
              <p className="mt-3 text-sm text-[#5C5854] max-w-2xl mx-auto">
                {isAm
                  ? "እያንዳንዱን ዘርፍ ይምረጡ፤ ዓላማውንና የታቀዱ ቁልፍ ተግባራትን ይመልከቱ።"
                  : "Select an area to review its objective and the practical tasks proposed for the team."}
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 lg:grid-cols-5 gap-2.5" role="group" aria-label={isAm ? "የትኩረት ዘርፎች" : "Areas of focus"}>
              {EXCELLENCE_AREAS.map((area, index) => {
                const isActive = activeExcellenceArea === index;
                return (
                  <button
                    key={area.titleEn}
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="excellence-area-detail"
                    onClick={() => setActiveExcellenceArea(index)}
                    className={`min-h-24 rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AE8F05] focus-visible:ring-offset-2 ${
                      isActive
                        ? "bg-[#173A32] border-[#173A32] text-white shadow-lg"
                        : "bg-white border-[#EAE6DE] text-[#2C2A28] hover:border-[#D4AF37] hover:shadow-md"
                    }`}
                  >
                    <span className={`block text-[10px] font-extrabold tracking-wider ${isActive ? "text-[#F0D082]" : "text-[#AE8F05]"}`}>
                      0{index + 1}
                    </span>
                    <span className="block mt-2 text-xs sm:text-sm font-bold leading-snug">
                      {isAm ? area.titleAm : area.titleEn}
                    </span>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeExcellenceArea}
              id="excellence-area-detail"
              role="region"
              aria-live="polite"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 grid lg:grid-cols-12 gap-6 rounded-2xl bg-white border border-[#EAE6DE] shadow-lg p-6 sm:p-8"
            >
              <div className="lg:col-span-4 lg:border-r border-[#EAE6DE] lg:pr-7">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#FAF5E6] border border-[#AE8F05]/20 text-[#AE8F05] font-serif font-extrabold">
                  0{activeExcellenceArea + 1}
                </span>
                <h5 className="mt-4 font-serif text-xl sm:text-2xl font-bold text-[#2C2A28]">
                  {isAm ? EXCELLENCE_AREAS[activeExcellenceArea].titleAm : EXCELLENCE_AREAS[activeExcellenceArea].titleEn}
                </h5>
                <p className="mt-3 text-sm leading-relaxed text-[#5C5854]">
                  {isAm ? EXCELLENCE_AREAS[activeExcellenceArea].objectiveAm : EXCELLENCE_AREAS[activeExcellenceArea].objectiveEn}
                </p>
              </div>
              <div className="lg:col-span-8">
                <h6 className="text-xs font-extrabold uppercase tracking-wider text-[#AE8F05]">
                  {isAm ? "ቁልፍ ተግባራት" : "Key Tasks"}
                </h6>
                <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {(isAm
                    ? EXCELLENCE_AREAS[activeExcellenceArea].tasksAm
                    : EXCELLENCE_AREAS[activeExcellenceArea].tasksEn
                  ).map((task) => (
                    <li key={task} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#4A4744]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#AE8F05] shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <div className="mt-8 grid lg:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white border border-[#EAE6DE] p-6 sm:p-7">
                <div className="flex items-center gap-3 pb-4 border-b border-[#AE8F05]/20">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF5E6] flex items-center justify-center text-[#AE8F05]">
                    <Users className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif text-lg font-bold text-[#2C2A28]">
                    {isAm ? "ለቡድኑ ስኬት የሚያስፈልጉ ሁኔታዎች" : "Conditions for Success"}
                  </h5>
                </div>
                <ul className="mt-4 space-y-3">
                  {TEAM_ENABLERS.map((item) => (
                    <li key={item.en} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#5C5854]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#AE8F05] shrink-0" />
                      <span>{isAm ? item.am : item.en}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-[#F4F0E7] border border-[#E5D7B3] p-6 sm:p-7">
                <div className="flex items-center gap-3 pb-4 border-b border-[#AE8F05]/20">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#AE8F05] border border-[#AE8F05]/20">
                    <Award className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif text-lg font-bold text-[#2C2A28]">
                    {isAm ? "የሚጠበቁ ውጤቶች" : "Expected Outcomes"}
                  </h5>
                </div>
                <ul className="mt-4 space-y-3">
                  {TEAM_OUTCOMES.map((item) => (
                    <li key={item.en} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#4A4744]">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#AE8F05] shrink-0" />
                      <span>{isAm ? item.am : item.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-[#173A32] text-white p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="md:w-1/3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F0D082]">
                    {isAm ? "ቀጣይ እርምጃዎች" : "Next Steps"}
                  </span>
                  <h5 className="mt-2 font-serif text-xl sm:text-2xl font-bold">
                    {isAm ? "ከሐሳብ ወደ ዕቅድ" : "From Concept to Plan"}
                  </h5>
                </div>
                <ol className="md:w-2/3 grid sm:grid-cols-3 gap-4">
                  {TEAM_NEXT_STEPS.map((step, index) => (
                    <li key={step.en} className="border-t border-white/20 pt-3">
                      <span className="font-serif text-lg font-extrabold text-[#F0D082]">0{index + 1}</span>
                      <p className="mt-1 text-sm leading-relaxed text-white/85">
                        {isAm ? step.am : step.en}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="mt-6 pt-5 border-t border-white/15 text-xs sm:text-sm leading-relaxed text-white/70">
                {isAm
                  ? "ይህ ማዕቀፍ በአመራር ውይይት፣ በቡድን ምስረታና በዝርዝር ዕቅድ እንዲጠናከር የቀረበ የጽንሰ ሐሳብ ነው።"
                  : "This is a proposed concept note, to be reviewed with church leadership and developed through team formation and detailed implementation planning."}
              </p>
            </div>
          </motion.section>

          {/* FULL DIRECTORY: Leaders Cards */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2A28]">
                {isAm ? "የካውንስል አባላት፣ የኔትወርክና የዲፓርትመንት መሪዎች ማውጫ" : "Council Members, Network Leaders & Section Heads Directory"}
              </h4>
              <p className="text-xs sm:text-sm text-[#5C5854] mt-2 max-w-xl mx-auto">
                {isAm ? "የተልዕኮ ለትውልድ አገልግሎትን በታማኝነት የሚመሩ መሪዎች" : "Faithful Leaders & Ministers guiding the vision across all local and national networks."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEADERS_DIRECTORY.map((leader) => (
                <motion.div
                  key={leader.id}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-5 border border-[#EAE6DE] hover:border-[#D4AF37] hover:shadow-lg hover:scale-[1.02] transition-all flex items-start space-x-4 shadow-sm"
                >
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#AE8F05]/30 flex-shrink-0 flex items-center justify-center shadow-sm">
                    {leader.photoUrl ? (
                      <ImageWithFallback
                        src={leader.photoUrl}
                        alt={leader.nameEn}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <UserCheck className="w-7 h-7 text-[#AE8F05]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#AE8F05] px-2 py-0.5 rounded-md bg-[#FAF5E6] inline-block mb-1 border border-[#AE8F05]/20">
                      {leader.category === "council" ? "COUNCIL MEMBER" : leader.category === "network" ? "NETWORK LEADER" : "DEPARTMENT HEAD"}
                    </span>
                    <h5 className="font-serif font-bold text-sm text-[#2C2A28] truncate">
                      {isAm ? leader.nameAm : leader.nameEn}
                    </h5>
                    <p className="text-xs text-[#5C5854] font-medium leading-tight mt-1">
                      {isAm ? leader.roleAm : leader.roleEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
