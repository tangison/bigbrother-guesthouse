// Real business data. Sources:
// NAP + directions: client contact page (bigbrotherguesthouse.com/contact), Oct 2026 audit
// Restaurant hours + phone: client restaurant page, Oct 2026 audit
// Distances (147km Swakopmund, 210km Windhoek): client contact page
// Social handles: client A3 menu v3 footer + telecomonline.africa listing
// EST 2023: Big Brothers Restaurant logo badge

export const BIZ = {
  name: 'Big Brother Holdings',
  guesthouse: {
    name: 'Big Brother Guesthouse',
    tagline: 'Home Away From Home',
    phone1: '+264812647606',
    phone1Display: '+264 81 264 7606',
    phone2: '+264852647606',
    phone2Display: '+264 85 264 7606',
    email: 'bigbrotherguest@gmail.com',
    postal: 'P.O. Box 324, Usakos, Namibia',
  },
  restaurant: {
    name: 'Big Brothers Restaurant',
    tagline: 'Good Food, Great Vibes',
    phone: '+264813029522',
    phoneDisplay: '+264 81 302 9522',
    whatsapp: '264813029522',
    email: 'bigbrothersrestaurant@gmail.com',
    hours: [
      { days: 'Monday to Friday', time: '07:00 to 22:00' },
      { days: 'Saturday and Sunday', time: '08:00 to 21:00' },
    ],
  },
  address: {
    street: 'Plot 7, Laaste Begin, Usakos South',
    area: 'B2 road, on the bench of the Khan River, 1 km turn-off south, opposite the Shell station',
    town: 'Usakos',
    region: 'Erongo Region',
    country: 'Namibia',
  },
  distances: { swakopmundKm: 147, windhoekKm: 210 },
  socials: {
    facebook: 'https://www.facebook.com/bigbrotherguesthouse/',
    instagram: 'https://www.instagram.com/bigbrotherguesthouse/',
    facebookHandle: '@bigbrotherguesthouse',
  },
  established: { restaurant: '2023' },
  site: 'https://www.bigbrotherguesthouse.com',
}

export const wa = (num: string, text: string) =>
  `https://wa.me/${num}?text=${encodeURIComponent(text)}`
