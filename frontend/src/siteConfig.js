const officeQuery = 'Peelamedu, Coimbatore, Tamil Nadu, India';
const directionsDestination = encodeURIComponent(officeQuery);
const placeholderSocialProfiles = [
  { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/northlinefacilities.example/' },
  { name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/northlinefacilities.example' },
  { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/northline-facilities-example/' },
  { name: 'WhatsApp', icon: 'whatsapp', href: 'https://wa.me/910000000000?text=Northline%20Facilities%20preview' },
  { name: 'X', icon: 'x', href: 'https://x.com/northlinefacilities_example' },
  { name: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@northlinefacilities_example' }
].map((profile) => Object.freeze({ ...profile, placeholder: true }));

/** Replace all fictional sample details and profile URLs with verified company information before launch. */
export const siteConfig = Object.freeze({
  name: 'Northline Facilities',
  descriptor: 'Integrated Facilities Management · India',
  origin: 'https://northlinefm.example',
  email: 'hello@northlinefm.example',
  privacyEmail: 'privacy@northlinefm.example',
  phone: '+91 422 000 0148',
  phoneHref: '+914220000148',
  officeLabel: 'Northline Facilities',
  addressLine: 'Peelamedu',
  city: 'Coimbatore',
  region: 'Tamil Nadu',
  postalCode: '641004',
  country: 'India',
  countryCode: 'IN',
  timezone: 'Asia/Kolkata',
  businessHours: 'Monday–Saturday, 9:00 am–6:00 pm IST',
  emergencyHours: 'Urgent coverage agreed per service scope',
  serviceRegion: 'Coimbatore · Chennai · Bengaluru · Kochi',
  mapQuery: officeQuery,
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(officeQuery)}&z=15&output=embed`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${directionsDestination}`,
  currency: 'INR',
  currencyLocale: 'en-IN',
  socialLinks: Object.freeze(placeholderSocialProfiles)
});
