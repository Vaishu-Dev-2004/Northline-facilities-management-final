// Each sample client has one included property record; keep the displayed counts consistent.
export const clients = [
  { id: 'CL-1048', name: 'Meridian Workspaces', contact: 'Kavya Raman', email: 'kavya@meridian.example', properties: 1, contract: 'Enterprise', status: 'Active' },
  { id: 'CL-1047', name: 'Harborview Health', contact: 'Dr. Naveen Varma', email: 'naveen@harborview.example', properties: 1, contract: 'Enterprise', status: 'Active' },
  { id: 'CL-1046', name: 'Juniper Residential', contact: 'Priya Nair', email: 'priya@juniper.example', properties: 1, contract: 'Professional', status: 'Active' },
  { id: 'CL-1045', name: 'Westward Learning Group', contact: 'Radhika Krishnan', email: 'radhika@westward.example', properties: 1, contract: 'Professional', status: 'Active' },
  { id: 'CL-1044', name: 'Atelier House Hotels', contact: 'Sandeep Rao', email: 'sandeep@atelier.example', properties: 1, contract: 'Enterprise', status: 'Active' },
  { id: 'CL-1043', name: 'Fieldstone Logistics', contact: 'Aishwarya Nair', email: 'aishwarya@fieldstone.example', properties: 1, contract: 'Professional', status: 'Active' },
  { id: 'CL-1042', name: 'Cedar & Finch Retail', contact: 'Vijay Kumar', email: 'vijay@cedarfinch.example', properties: 1, contract: 'Professional', status: 'Active' },
  { id: 'CL-1041', name: 'Pioneer BioLabs', contact: 'Dr. Meera Balasubramanian', email: 'meera@pioneer.example', properties: 1, contract: 'Enterprise', status: 'Active' },
  { id: 'CL-1040', name: 'Civic Arts Foundation', contact: 'Vivek Chandran', email: 'vivek@civicarts.example', properties: 1, contract: 'Essential', status: 'Review' },
  { id: 'CL-1039', name: 'Alder Manufacturing', contact: 'Hari Prakash', email: 'hari@alder.example', properties: 1, contract: 'Professional', status: 'Active' }
];

export const properties = [
  { id: 'PR-2201', name: 'Meridian Tech Park Tower 2', type: 'Corporate office', client: 'Meridian Workspaces', address: 'TIDEL Park Road, Coimbatore, Tamil Nadu', area: '184,000 sq ft', manager: 'Ananya Iyer', health: 96, status: 'Operational' },
  { id: 'PR-2202', name: 'Harborview Medical Centre', type: 'Healthcare', client: 'Harborview Health', address: 'Avinashi Road · Peelamedu, Coimbatore, Tamil Nadu', area: '126,500 sq ft', manager: 'Karthik Subramanian', health: 92, status: 'Operational' },
  { id: 'PR-2203', name: 'Juniper Residences · Saravanampatti', type: 'Residential', client: 'Juniper Residential', address: 'Saravanampatti, Coimbatore, Tamil Nadu', area: '98,200 sq ft', manager: 'Divya Narayanan', health: 89, status: 'Operational' },
  { id: 'PR-2204', name: 'Westward Learning Campus', type: 'Education', client: 'Westward Learning Group', address: 'Peelamedu Education District, Coimbatore, Tamil Nadu', area: '212,000 sq ft', manager: 'Krishna Moorthy', health: 94, status: 'Operational' },
  { id: 'PR-2205', name: 'Atelier House Coimbatore', type: 'Hospitality', client: 'Atelier House Hotels', address: 'Race Course Road, Coimbatore, Tamil Nadu', area: '78,400 sq ft', manager: 'Nandhini Raj', health: 97, status: 'Operational' },
  { id: 'PR-2206', name: 'Fieldstone Logistics Hub', type: 'Warehouse', client: 'Fieldstone Logistics', address: 'Neelambur Logistics Park, Coimbatore, Tamil Nadu', area: '306,000 sq ft', manager: 'Ravi Shankar', health: 87, status: 'Attention' },
  { id: 'PR-2207', name: 'Cedar & Finch Retail · RS Puram', type: 'Retail', client: 'Cedar & Finch Retail', address: 'R.S. Puram, Coimbatore, Tamil Nadu', area: '41,800 sq ft', manager: 'Ananya Iyer', health: 95, status: 'Operational' },
  { id: 'PR-2208', name: 'Pioneer BioLabs · KGISL Tech Park', type: 'Laboratory', client: 'Pioneer BioLabs', address: 'KGISL Tech Park, Coimbatore, Tamil Nadu', area: '64,100 sq ft', manager: 'Karthik Subramanian', health: 98, status: 'Operational' },
  { id: 'PR-2209', name: 'Civic Arts Centre · Race Course', type: 'Cultural', client: 'Civic Arts Foundation', address: 'Race Course, Coimbatore, Tamil Nadu', area: '53,700 sq ft', manager: 'Divya Narayanan', health: 82, status: 'Attention' },
  { id: 'PR-2210', name: 'Alder Manufacturing · SIDCO', type: 'Manufacturing', client: 'Alder Manufacturing', address: 'SIDCO Industrial Estate, Coimbatore, Tamil Nadu', area: '248,000 sq ft', manager: 'Ravi Shankar', health: 91, status: 'Operational' }
];

export const users = [
  { id: 'US-3180', name: 'Ananya Iyer', email: 'ananya.iyer@northline.example', role: 'Admin', company: 'Northline Facilities', status: 'Active', lastActive: 'Today, 9:42 AM' },
  { id: 'US-3179', name: 'Arjun Menon', email: 'arjun.menon@northline.example', role: 'Super Admin', company: 'Northline Facilities', status: 'Active', lastActive: 'Today, 8:15 AM' },
  { id: 'US-3178', name: 'Divya Narayanan', email: 'divya.narayanan@northline.example', role: 'Manager', company: 'Northline Facilities', status: 'Active', lastActive: 'Today, 9:06 AM' },
  { id: 'US-3177', name: 'Karthik Subramanian', email: 'karthik.subramanian@northline.example', role: 'Manager', company: 'Northline Facilities', status: 'Active', lastActive: 'Today, 8:54 AM' },
  { id: 'US-3176', name: 'Kavya Raman', email: 'kavya@meridian.example', role: 'Client', company: 'Meridian Workspaces', status: 'Active', lastActive: 'Today, 9:21 AM' },
  { id: 'US-3175', name: 'Dr. Naveen Varma', email: 'naveen@harborview.example', role: 'Client', company: 'Harborview Health', status: 'Active', lastActive: 'Yesterday' },
  { id: 'US-3174', name: 'Priya Nair', email: 'priya@juniper.example', role: 'Client', company: 'Juniper Residential', status: 'Active', lastActive: 'Today, 7:58 AM' },
  { id: 'US-3173', name: 'Radhika Krishnan', email: 'radhika@westward.example', role: 'Client', company: 'Westward Learning Group', status: 'Active', lastActive: 'Oct 6, 2026' },
  { id: 'US-3172', name: 'Sandeep Rao', email: 'sandeep@atelier.example', role: 'Client', company: 'Atelier House Hotels', status: 'Active', lastActive: 'Today, 8:03 AM' },
  { id: 'US-3171', name: 'Aishwarya Nair', email: 'aishwarya@fieldstone.example', role: 'Client', company: 'Fieldstone Logistics', status: 'Active', lastActive: 'Oct 7, 2026' },
  { id: 'US-3170', name: 'Vijay Kumar', email: 'vijay@cedarfinch.example', role: 'Client', company: 'Cedar & Finch Retail', status: 'Active', lastActive: 'Oct 5, 2026' },
  { id: 'US-3169', name: 'Dr. Meera Balasubramanian', email: 'meera@pioneer.example', role: 'Client', company: 'Pioneer BioLabs', status: 'Active', lastActive: 'Today, 8:32 AM' },
  { id: 'US-3168', name: 'Vivek Chandran', email: 'vivek@civicarts.example', role: 'Client', company: 'Civic Arts Foundation', status: 'Invited', lastActive: '—' },
  { id: 'US-3167', name: 'Hari Prakash', email: 'hari@alder.example', role: 'Client', company: 'Alder Manufacturing', status: 'Active', lastActive: 'Oct 7, 2026' },
  { id: 'US-3166', name: 'Senthil Kumar', email: 'senthil.kumar@northline.example', role: 'Technician', company: 'Northline Facilities', status: 'Active', lastActive: 'Today, 9:14 AM' },
  { id: 'US-3165', name: 'Kiran Raj', email: 'kiran.raj@northline.example', role: 'Technician', company: 'Northline Facilities', status: 'Active', lastActive: 'Today, 8:48 AM' },
  { id: 'US-3164', name: 'Lakshmi Prasad', email: 'lakshmi.prasad@northline.example', role: 'Technician', company: 'Northline Facilities', status: 'Active', lastActive: 'Today, 7:59 AM' },
  { id: 'US-3163', name: 'Rahul Menon', email: 'rahul.menon@northline.example', role: 'Technician', company: 'Northline Facilities', status: 'Active', lastActive: 'Oct 7, 2026' },
  { id: 'US-3162', name: 'Suresh Babu', email: 'suresh.babu@northline.example', role: 'Technician', company: 'Northline Facilities', status: 'Inactive', lastActive: 'Sep 28, 2026' },
  { id: 'US-3161', name: 'Aravind S', email: 'aravind.s@northline.example', role: 'Technician', company: 'Northline Facilities', status: 'Active', lastActive: 'Today, 9:31 AM' }
];

export const technicians = [
  { id: 'TN-081', name: 'Senthil Kumar', initials: 'SK', skills: 'HVAC · Controls', status: 'On site', jobs: 3, rating: '4.9', response: '18 min', completed: '97%' },
  { id: 'TN-080', name: 'Kiran Raj', initials: 'KR', skills: 'Electrical · Lighting', status: 'Available', jobs: 1, rating: '4.8', response: '22 min', completed: '96%' },
  { id: 'TN-079', name: 'Lakshmi Prasad', initials: 'LP', skills: 'Plumbing · Water systems', status: 'On site', jobs: 2, rating: '5.0', response: '16 min', completed: '99%' },
  { id: 'TN-078', name: 'Rahul Menon', initials: 'RM', skills: 'Building systems · BMS', status: 'Available', jobs: 2, rating: '4.8', response: '24 min', completed: '94%' },
  { id: 'TN-077', name: 'Aravind S', initials: 'AS', skills: 'General maintenance', status: 'On break', jobs: 1, rating: '4.7', response: '26 min', completed: '93%' },
  { id: 'TN-076', name: 'Sneha Reddy', initials: 'SR', skills: 'Life safety · Fire systems', status: 'Available', jobs: 1, rating: '4.9', response: '19 min', completed: '98%' },
  { id: 'TN-075', name: 'Prabhu Kumar', initials: 'PK', skills: 'Elevators · Mechanical', status: 'On site', jobs: 2, rating: '4.8', response: '21 min', completed: '95%' },
  { id: 'TN-074', name: 'Janani Devi', initials: 'JD', skills: 'Cleaning · Floor care', status: 'Available', jobs: 2, rating: '4.9', response: '20 min', completed: '98%' },
  { id: 'TN-073', name: 'Manoj Das', initials: 'MD', skills: 'Energy · Commissioning', status: 'Offline', jobs: 0, rating: '4.8', response: '25 min', completed: '95%' },
  { id: 'TN-072', name: 'Fathima A', initials: 'FA', skills: 'Grounds · Pest control', status: 'Available', jobs: 1, rating: '4.7', response: '23 min', completed: '92%' }
];

export const services = [
  { id: 'SV-001', slug: 'integrated-facilities-management', image: '/assets/services/integrated-facilities-management.jpg', imageAlt: 'Facilities manager coordinating building operations inside a modern commercial workplace.', name: 'Integrated Facilities Management', category: 'Maintenance', description: 'One accountable operating plan across technical, workplace and site services.', cardExcerpt: 'One accountable team for every site.', detail: 'Coordinate building engineering, workplace services, planned maintenance and specialist partners through one service desk, clear site responsibilities and consistent reporting. Designed for Indian organisations managing busy, multi-system facilities.', icon: 'building', benefits: ['One accountable service partner', 'Joined-up site teams and vendor coordination', 'Portfolio reporting aligned to operations'], industries: ['IT parks', 'Corporate offices', 'Manufacturing', 'Healthcare'], scope: ['Site mobilisation and asset register', 'Service desk, escalation and vendor oversight', 'Monthly performance and improvement review'], related: ['facility-maintenance','preventive-maintenance','smart-facility-management'] },
  { id: 'SV-002', slug: 'facility-maintenance', image: '/assets/services/facility-maintenance.jpg', imageAlt: 'Facilities technician inspecting a commercial building service corridor.', name: 'Technical & Building Maintenance', category: 'Maintenance', description: 'Responsive repairs and planned care for the assets people rely on.', cardExcerpt: 'Planned care and responsive repairs.', detail: 'A practical building-maintenance programme brings routine inspections and responsive repair together. Our sample scope covers building fabric, common areas and essential plant, with clear priority, site access and follow-up notes.', icon: 'wrench', benefits: ['Fewer repeat callouts through better job history', 'Priority-led response for live sites', 'Clear completion notes and follow-up actions'], industries: ['Commercial buildings', 'Education', 'Retail', 'Residential communities'], scope: ['Reactive building and fabric repairs', 'Routine site checks and minor works', 'Completion evidence and open-action tracking'], related: ['integrated-facilities-management','civil-fabric-maintenance','preventive-maintenance'] },
  { id: 'SV-003', slug: 'electrical-maintenance', image: '/assets/services/electrical-maintenance.jpg', imageAlt: 'Electrical engineer safely inspecting a commercial distribution switchboard.', name: 'Electrical Maintenance & Power Systems', category: 'Technical services', description: 'Inspection, troubleshooting and lifecycle care for facility electrical systems.', cardExcerpt: 'Safe electrical checks and repairs.', detail: 'Support electrical distribution and site power systems with planned checks, responsive fault diagnosis and clear escalation. Work is coordinated to the property’s approved safety procedures and statutory requirements.', icon: 'bolt', benefits: ['More visible electrical asset condition', 'Planned checks for critical circuits', 'Documented actions and specialist escalation'], industries: ['IT parks', 'Data centres', 'Healthcare', 'Manufacturing'], scope: ['Panels, lighting and essential circuits', 'Earthing and power-quality observations', 'Permit-to-work and specialist vendor coordination'], related: ['ups-power-backup','generator-maintenance','energy-management'] },
  { id: 'SV-004', slug: 'plumbing-water-systems', image: '/assets/services/plumbing-water-systems.jpg', imageAlt: 'Plumbing technician checking commercial water pipes, valves and pumps.', name: 'Plumbing & Water Systems', category: 'Technical services', description: 'Care for domestic water, drainage, pumps and site water infrastructure.', cardExcerpt: 'Care for water, drainage and pumps.', detail: 'Keep water and drainage systems serviceable with scheduled inspections, responsive repairs and clear site records. Planned work can be aligned with occupancy, water-use needs and property operating windows.', icon: 'droplet', benefits: ['Earlier identification of leaks and pressure changes', 'More reliable water-system records', 'Clear coordination for specialist treatment work'], industries: ['Healthcare', 'Residential communities', 'Hospitality', 'Education'], scope: ['Fixtures, drainage and water lines', 'Tank, pump and pressure observations', 'Water-system checks and corrective follow-up'], related: ['pumps-equipment','preventive-maintenance','emergency-maintenance'] },
  { id: 'SV-005', slug: 'hvac-chiller-maintenance', image: '/assets/services/hvac-chiller-maintenance.jpg', imageAlt: 'HVAC engineer inspecting commercial chiller and air-handling equipment.', name: 'HVAC & Chiller Maintenance', category: 'Technical services', description: 'Planned service for chillers, AHUs, ventilation and comfort systems.', cardExcerpt: 'Comfort care for cooling and air systems.', detail: 'Support year-round thermal comfort in India’s varied operating conditions with a planned approach to chillers, air handling, ventilation and controls. Service visits are coordinated around occupied hours, seasonal changeovers and site-specific risk.', icon: 'fan', benefits: ['More consistent comfort and indoor-air observations', 'Better planned visibility of critical equipment', 'Reduced avoidable disruption during peak demand'], industries: ['IT parks', 'Hospitals', 'Hotels', 'Data centres'], scope: ['Chillers, AHUs, ventilation and filters', 'Operating readings and condition notes', 'Seasonal readiness and specialist escalation'], related: ['bms-integration','predictive-maintenance','energy-management'] },
  { id: 'SV-006', slug: 'civil-fabric-maintenance', image: '/assets/services/civil-fabric-maintenance.jpg', imageAlt: 'Maintenance technician carrying out a minor repair to an office door and frame.', name: 'Civil & Fabric Maintenance', category: 'Maintenance', description: 'Practical care for finishes, doors, roofs and everyday building fabric.', cardExcerpt: 'Keep finishes, doors and roofs sound.', detail: 'Look after the physical fabric of the workplace with minor civil repairs, finish restoration and planned inspections. Site reviews can flag water ingress, damp and weather-related wear before they become larger interruptions.', icon: 'building', benefits: ['A more consistent site experience', 'Earlier attention to weather-related deterioration', 'Trackable small works across properties'], industries: ['Commercial buildings', 'Education', 'Retail', 'Residential communities'], scope: ['Minor masonry, paint and finish repairs', 'Roof, door and common-area observations', 'Monsoon-readiness and remedial work tracking'], related: ['facility-maintenance','landscaping-grounds','emergency-maintenance'] },
  { id: 'SV-007', slug: 'generator-maintenance', image: '/assets/services/generator-maintenance.jpg', imageAlt: 'Engineer performing a readiness inspection on a standby diesel generator.', name: 'Generator (DG Set) Maintenance', category: 'Technical services', description: 'Planned DG-set readiness checks and operating-record coordination.', cardExcerpt: 'Backup power, ready when needed.', detail: 'Support backup-power readiness through planned visual checks, operating-log review and maintenance coordination for diesel generator sets. Load testing and specialist work are scheduled with approved partners and site safety controls.', icon: 'activity', benefits: ['Clearer readiness records for backup power', 'Planned coordination of specialist visits', 'Fewer last-minute service surprises'], industries: ['Hospitals', 'IT parks', 'Manufacturing', 'Commercial buildings'], scope: ['DG-set inspection and operating records', 'Readiness and service-calendar tracking', 'Specialist partner and safety coordination'], related: ['ups-power-backup','electrical-maintenance','preventive-maintenance'] },
  { id: 'SV-008', slug: 'ups-power-backup', image: '/assets/services/ups-power-backup.jpg', imageAlt: 'Technician reviewing uninterruptible power equipment and battery cabinets.', name: 'UPS & Power Backup Systems', category: 'Technical services', description: 'Service coordination for UPS, battery banks and critical power continuity.', cardExcerpt: 'UPS, battery and critical-power care.', detail: 'Keep critical power assets visible through planned inspections, battery and alarm observations, operating records and specialist maintenance coordination. Critical sites can map escalation paths to agreed continuity procedures.', icon: 'bolt', benefits: ['Better visibility of backup-power condition', 'Planned battery and service reviews', 'Clear escalation for critical loads'], industries: ['Data centres', 'Healthcare', 'IT parks', 'Financial services'], scope: ['UPS and battery-bank observations', 'Alarm, bypass and service-log review', 'Partner coordination and continuity notes'], related: ['generator-maintenance','electrical-maintenance','predictive-maintenance'] },
  { id: 'SV-009', slug: 'pumps-equipment', image: '/assets/services/pumps-equipment.jpg', imageAlt: 'Technician checking the coupling and condition of a commercial pump and motor.', name: 'Pumps & Equipment Maintenance', category: 'Technical services', description: 'Condition-led care for pumps, motors and rotating equipment.', cardExcerpt: 'Care for pumps, motors and equipment.', detail: 'Use routine observations, service history and operating readings to keep pumps and essential equipment on a manageable maintenance cycle. Work can include coordination across water, HVAC and process-support systems.', icon: 'settings', benefits: ['Earlier visibility of vibration, noise and leakage', 'More organised service history', 'Planned follow-up before avoidable downtime'], industries: ['Manufacturing', 'Residential communities', 'Healthcare', 'Hospitality'], scope: ['Pump, motor and rotating-equipment observations', 'Condition and service-log review', 'Repair, spares and specialist coordination'], related: ['plumbing-water-systems','hvac-chiller-maintenance','predictive-maintenance'] },
  { id: 'SV-010', slug: 'lift-vertical-transportation', image: '/assets/services/lift-vertical-transportation.jpg', imageAlt: 'Lift engineer inspecting elevator traction equipment and its control cabinet.', name: 'Lift & Vertical Transportation Support', category: 'Technical services', description: 'Planned lift-service coordination and responsive passenger-support escalation.', cardExcerpt: 'Lift servicing and passenger support.', detail: 'Coordinate scheduled lift maintenance, service partner access and clear incident escalation for vertical transportation. Repair and statutory certification are delivered by appropriately authorised specialists under the client’s governance.', icon: 'arrowUp', benefits: ['Clear ownership during service events', 'Planned access and partner visits', 'Consistent incident and downtime records'], industries: ['Commercial buildings', 'Healthcare', 'Residential communities', 'Hotels'], scope: ['Service calendars and access arrangements', 'Passenger incident escalation path', 'Partner reports and follow-up actions'], related: ['integrated-facilities-management','emergency-maintenance','preventive-maintenance'] },
  { id: 'SV-011', slug: 'cleaning-workplace-services', image: '/assets/services/cleaning-workplace-services.jpg', imageAlt: 'Brush and cleaning solution being used to scrub hard-surface flooring.', name: 'Cleaning & Workplace Services', category: 'Cleaning', description: 'Site-specific cleaning and workplace care shaped around occupancy.', cardExcerpt: 'Cleaning planned around people and place.', detail: 'Build cleaning schedules around how each space is used, with clear service standards for common areas, washrooms, work zones and high-touch points. Delivery is planned for Indian business hours, shift patterns and site occupancy.', icon: 'sparkle', benefits: ['Consistent, visible cleaning standards', 'Schedules matched to occupancy and footfall', 'Clear inspection and corrective-action records'], industries: ['Corporate offices', 'Education', 'Healthcare', 'Retail'], scope: ['Daily and periodic cleaning schedules', 'Washroom, common-area and floor-care plans', 'Site inspections and service recovery'], related: ['integrated-facilities-management','security-safety','sustainability-services'] },
  { id: 'SV-012', slug: 'preventive-maintenance', image: '/assets/services/preventive-maintenance.jpg', imageAlt: 'Technician checking an outdoor air-conditioning unit during planned maintenance.', name: 'Preventive Maintenance', category: 'Maintenance', description: 'Planned inspections for critical assets, building systems and site risks.', cardExcerpt: 'Planned checks for critical assets.', detail: 'Translate asset criticality, manufacturer recommendations and operating patterns into a maintainable calendar. Completion rates, findings and overdue actions remain visible to the client and operations teams.', icon: 'calendar', benefits: ['More planned work and fewer avoidable emergencies', 'Clear ownership for overdue actions', 'Useful evidence for operational reviews'], industries: ['Manufacturing', 'Healthcare', 'IT parks', 'Education'], scope: ['Asset register and task-calendar review', 'Planned visits, checklists and sign-off', 'Exceptions, corrective work and completion reporting'], related: ['integrated-facilities-management','predictive-maintenance','hvac-chiller-maintenance'] },
  { id: 'SV-013', slug: 'security-safety', image: '/assets/services/security-safety.jpg', imageAlt: 'Office staff member presenting an access card to an electronic building-entry reader.', name: 'Security & Safety Coordination', category: 'Security', description: 'Coordinated access, incident escalation and safety processes for live sites.', cardExcerpt: 'Access, safety and incident coordination.', detail: 'Bring site access, guard-provider coordination and facilities incident response into a consistent operating rhythm. Security duties and statutory responsibilities remain defined by the client and appropriately licensed partners.', icon: 'shield', benefits: ['Clear site escalation and communication paths', 'Consistent access and incident records', 'Safety expectations visible to service partners'], industries: ['Corporate offices', 'Healthcare', 'Warehouses', 'Residential communities'], scope: ['Access and visitor-process coordination', 'Incident logging and escalation', 'Contractor induction and permit-to-work alignment'], related: ['integrated-facilities-management','emergency-maintenance','cleaning-workplace-services'] },
  { id: 'SV-014', slug: 'energy-management', image: '/assets/fm-plant-room.jpg', imageAlt: 'Facilities engineer reviewing equipment readings in a commercial plant room.', name: 'Energy Management', category: 'Energy', description: 'Practical energy reviews for building systems, operating hours and utility use.', cardExcerpt: 'Practical reviews to reduce energy use.', detail: 'Make energy use easier to understand by reviewing operating schedules, building-system performance and utility patterns. Recommendations focus on measurable, site-specific operational improvements rather than unverified savings promises.', icon: 'chart', benefits: ['Clearer energy baselines and operating trends', 'Actionable schedules for major building systems', 'Evidence to support client sustainability goals'], industries: ['IT parks', 'Manufacturing', 'Commercial buildings', 'Education'], scope: ['Utility and meter-data review', 'Operating schedule and setpoint observations', 'Opportunity register and progress checks'], related: ['sustainability-services','bms-integration','smart-facility-management'] },
  { id: 'SV-015', slug: 'sustainability-services', image: '/assets/services/sustainability-services.jpg', imageAlt: 'Solar technician inspecting photovoltaic panels as part of a building sustainability programme.', name: 'Sustainability Services', category: 'Energy', description: 'Operational improvements for energy, water, waste and responsible procurement.', cardExcerpt: 'Improve energy, water and waste practices.', detail: 'Support practical environmental improvements with site data, facilities actions and review routines that operations teams can maintain. Any carbon, water or waste claims should be based on verified measurements and agreed reporting boundaries.', icon: 'leaf', benefits: ['Site actions connected to measurable indicators', 'Better coordination of energy, water and waste initiatives', 'Evidence that can be reviewed with stakeholders'], industries: ['Corporate offices', 'IT parks', 'Education', 'Manufacturing'], scope: ['Energy and water opportunity tracking', 'Waste-diversion and supplier data coordination', 'Progress reviews with documented assumptions'], related: ['energy-management','cleaning-workplace-services','smart-facility-management'] },
  { id: 'SV-016', slug: 'pest-control', image: '/assets/services/pest-control.jpg', imageAlt: 'Pest-management specialist applying a controlled warehouse treatment while wearing protective equipment.', name: 'Pest Control', category: 'Maintenance', description: 'Prevention-first pest management coordinated with approved specialists.', cardExcerpt: 'Prevention-led pest management.', detail: 'Coordinate inspections, site hygiene actions and approved pest-control partners with minimal disruption to occupants, stock and sensitive operations. Treatment methods are selected by qualified providers for the site and applicable requirements.', icon: 'shield', benefits: ['Earlier attention to conditions that attract pests', 'Documented inspections and corrective actions', 'Careful scheduling for sensitive environments'], industries: ['Healthcare', 'Food and hospitality', 'Warehouses', 'Education'], scope: ['Inspection and trend records', 'Site hygiene and exclusion actions', 'Specialist treatment and follow-up coordination'], related: ['cleaning-workplace-services','security-safety','integrated-facilities-management'] },
  { id: 'SV-017', slug: 'landscaping-grounds', image: '/assets/services/landscaping-grounds.jpg', imageAlt: 'Groundskeeper maintaining a landscaped lawn in a public park setting.', name: 'Landscaping & Grounds', category: 'Cleaning', description: 'Seasonal grounds care for safe, welcoming and well-maintained sites.', cardExcerpt: 'Seasonal care for welcoming, safe grounds.', detail: 'Plan grounds maintenance around site access, seasonal rainfall and local landscape conditions. Work can cover routine horticulture, pathways, irrigation observations and coordination of specialist arboriculture.', icon: 'leaf', benefits: ['Safer, more welcoming outdoor spaces', 'Seasonal tasks planned around site use', 'Visible inspection and contractor follow-up'], industries: ['Corporate campuses', 'Residential communities', 'Education', 'Hospitality'], scope: ['Horticulture and grounds-care schedules', 'Pathway, drainage and irrigation observations', 'Seasonal and monsoon-readiness actions'], related: ['civil-fabric-maintenance','sustainability-services','integrated-facilities-management'] },
  { id: 'SV-018', slug: 'emergency-maintenance', image: '/assets/services/emergency-maintenance.jpg', imageAlt: 'Technician diagnosing a building air-conditioning unit during a repair visit.', name: 'Emergency Maintenance', category: 'Emergency services', description: 'Urgent incident escalation for facility faults and service disruptions, with coverage agreed in the service scope.', cardExcerpt: 'Urgent support for faults and disruption.', detail: 'Give site teams a clear route to report urgent building issues, reach the operations desk and receive coordinated updates. Response expectations, escalation contacts and service coverage are agreed for each client and city.', icon: 'clock', benefits: ['One clear point of contact for urgent incidents', 'Priority triage and documented escalation', 'Communication through to service restoration'], industries: ['Healthcare', 'Manufacturing', 'IT parks', 'Residential communities'], scope: ['Urgent incident intake and priority triage as agreed in scope', 'On-call resource and specialist partner coordination', 'Status updates and incident close-out notes'], related: ['integrated-facilities-management','security-safety','facility-maintenance'] },
  { id: 'SV-019', slug: 'smart-facility-management', image: '/assets/fm-workplace-operations.jpg', imageAlt: 'Facilities coordinator reviewing building systems beside a control panel in an office campus.', name: 'Smart Facility Management', category: 'Technical services', description: 'A joined-up digital view of assets, service requests and operating performance.', cardExcerpt: 'Connected operations and asset visibility.', detail: 'Connect work orders, site schedules, asset records and performance reviews in one operational workspace. Smart FM should simplify the work of site teams and clients—not add another disconnected system.', icon: 'sparkle', benefits: ['One shared view of work and site information', 'Faster handoffs between clients and field teams', 'More useful portfolio-level reporting'], industries: ['IT parks', 'Corporate offices', 'Data centres', 'Manufacturing'], scope: ['Digital work-order and service history', 'Asset and maintenance schedule visibility', 'Operational dashboards and review workflows'], related: ['iot-monitoring','bms-integration','predictive-maintenance'] },
  { id: 'SV-020', slug: 'iot-monitoring', image: '/assets/services/iot-monitoring.jpg', imageAlt: 'Rows of monitored equipment in a data-centre server room.', name: 'IoT Monitoring', category: 'Technical services', description: 'Connected sensor signals translated into useful facilities alerts.', cardExcerpt: 'Turn sensor signals into useful alerts.', detail: 'Where clients already have suitable sensors, bring agreed readings and alerts into a practical review process. Data quality, alert thresholds, device ownership and privacy boundaries are confirmed before integration.', icon: 'activity', benefits: ['Earlier awareness of abnormal operating patterns', 'Fewer disconnected alerts for site teams', 'Clear ownership from signal to action'], industries: ['Data centres', 'Manufacturing', 'IT parks', 'Healthcare'], scope: ['Sensor and data-source inventory', 'Threshold and alert-routing review', 'Exception triage and work-order linkage'], related: ['bms-integration','predictive-maintenance','smart-facility-management'] },
  { id: 'SV-021', slug: 'bms-integration', image: '/assets/facility-hero.jpg', imageAlt: 'Facilities engineer reviewing a building-management control panel in a plant room.', name: 'BMS Integration', category: 'Technical services', description: 'Coordinate building-management-system data with facilities workflows.', cardExcerpt: 'Link building data to daily workflows.', detail: 'Help teams make better use of existing BMS alarms and trends by aligning points, response ownership and maintenance processes. Integration is scoped to approved client systems and vendor access controls.', icon: 'settings', benefits: ['Less manual relay of building alarms', 'Clearer links between alarms and work orders', 'More consistent review of operating trends'], industries: ['IT parks', 'Hospitals', 'Commercial buildings', 'Data centres'], scope: ['BMS point and alarm review', 'Role-based notification and response mapping', 'Work-order and trend-review coordination'], related: ['iot-monitoring','energy-management','hvac-chiller-maintenance'] },
  { id: 'SV-022', slug: 'predictive-maintenance', image: '/assets/services/predictive-maintenance.jpg', imageAlt: 'Engineer recording condition observations beside industrial machinery.', name: 'Predictive Maintenance', category: 'Maintenance', description: 'Use asset history and condition signals to prioritise maintenance earlier.', cardExcerpt: 'Prioritise care with asset condition data.', detail: 'Combine service history, inspection findings and available condition data to identify assets that may need earlier attention. Predictions are decision support, not guarantees; technicians and client teams retain operational judgement.', icon: 'chart', benefits: ['Earlier prioritisation of developing issues', 'Maintenance based on condition as well as time', 'Evidence-led planning for critical assets'], industries: ['Manufacturing', 'Data centres', 'Healthcare', 'IT parks'], scope: ['Critical-asset and failure-history review', 'Condition indicators and trend assessment', 'Recommended work, review window and outcomes'], related: ['preventive-maintenance','iot-monitoring','bms-integration'] }
];

export const workOrders = [
  { id: 'WO-4821', title: 'Chiller 2 vibration inspection', client: 'Meridian Workspaces', property: 'Meridian Tech Park Tower 2', category: 'HVAC', priority: 'High', status: 'In Progress', assignee: 'Senthil Kumar', date: '2026-10-08', location: 'Level 4 · Chiller plant' },
  { id: 'WO-4820', title: 'Main lobby · Block A lighting circuit', client: 'Harborview Health', property: 'Harborview Medical Centre', category: 'Electrical', priority: 'Medium', status: 'Dispatched', assignee: 'Kiran Raj', date: '2026-10-08', location: 'Main lobby · Block A' },
  { id: 'WO-4819', title: 'Domestic water pressure review', client: 'Juniper Residential', property: 'Juniper Residences · Saravanampatti', category: 'Plumbing', priority: 'High', status: 'Assigned', assignee: 'Lakshmi Prasad', date: '2026-10-08', location: 'Block B · Water riser' },
  { id: 'WO-4818', title: 'Air handling unit filter change', client: 'Westward Learning Group', property: 'Westward Learning Campus', category: 'Preventive', priority: 'Low', status: 'Client Approval', assignee: 'Senthil Kumar', date: '2026-10-07', location: 'Science block · AHU room' },
  { id: 'WO-4817', title: 'Guest floor carpet spot treatment', client: 'Atelier House Hotels', property: 'Atelier House Coimbatore', category: 'Cleaning', priority: 'Medium', status: 'Pending Review', assignee: 'Unassigned', date: '2026-10-07', location: 'Level 3 · East wing' },
  { id: 'WO-4816', title: 'Dock leveler safety check', client: 'Fieldstone Logistics', property: 'Fieldstone Logistics Hub', category: 'Inspection', priority: 'Critical', status: 'In Progress', assignee: 'Prabhu Kumar', date: '2026-10-07', location: 'Loading bay 3' },
  { id: 'WO-4815', title: 'Exterior sign timer adjustment', client: 'Cedar & Finch Retail', property: 'Cedar & Finch Retail · RS Puram', category: 'Electrical', priority: 'Low', status: 'Completed', assignee: 'Kiran Raj', date: '2026-10-07', location: 'West entrance' },
  { id: 'WO-4814', title: 'Lab exhaust alarm investigation', client: 'Pioneer BioLabs', property: 'Pioneer BioLabs · KGISL Tech Park', category: 'HVAC', priority: 'Critical', status: 'Dispatched', assignee: 'Senthil Kumar', date: '2026-10-07', location: 'Lab 2A' },
  { id: 'WO-4813', title: 'Gallery humidity sensor calibration', client: 'Civic Arts Foundation', property: 'Civic Arts Centre · Race Course', category: 'Controls', priority: 'High', status: 'On Hold', assignee: 'Rahul Menon', date: '2026-10-06', location: 'Gallery 1' },
  { id: 'WO-4812', title: 'Compressed air leak at line 4', client: 'Alder Manufacturing', property: 'Alder Manufacturing · SIDCO', category: 'Mechanical', priority: 'Medium', status: 'Assigned', assignee: 'Aravind S', date: '2026-10-06', location: 'Production line 4 · compressor bay' },
  { id: 'WO-4811', title: 'Fire door closer adjustment', client: 'Meridian Workspaces', property: 'Meridian Tech Park Tower 2', category: 'Life safety', priority: 'Medium', status: 'In Progress', assignee: 'Sneha Reddy', date: '2026-10-06', location: 'Level 12 · Stair B' },
  { id: 'WO-4810', title: 'Loading bay floor scrub', client: 'Fieldstone Logistics', property: 'Fieldstone Logistics Hub', category: 'Cleaning', priority: 'Low', status: 'Completed', assignee: 'Janani Devi', date: '2026-10-06', location: 'Bay 7' },
  { id: 'WO-4809', title: 'Domestic hot water temperature', client: 'Harborview Health', property: 'Harborview Medical Centre', category: 'Plumbing', priority: 'High', status: 'Closed', assignee: 'Lakshmi Prasad', date: '2026-10-05', location: 'Patient wing · Level 3' },
  { id: 'WO-4808', title: 'Elevator door sensor fault', client: 'Juniper Residential', property: 'Juniper Residences · Saravanampatti', category: 'Mechanical', priority: 'Critical', status: 'Completed', assignee: 'Prabhu Kumar', date: '2026-10-05', location: 'Tower A · Lift 2' },
  { id: 'WO-4807', title: 'Quarterly generator exercise', client: 'Westward Learning Group', property: 'Westward Learning Campus', category: 'Preventive', priority: 'Medium', status: 'Assigned', assignee: 'Sneha Reddy', date: '2026-10-05', location: 'Central plant' },
  { id: 'WO-4806', title: 'Restroom sensor tap replacement', client: 'Cedar & Finch Retail', property: 'Cedar & Finch Retail · RS Puram', category: 'Plumbing', priority: 'Low', status: 'Completed', assignee: 'Lakshmi Prasad', date: '2026-10-04', location: 'Level 2 · West' },
  { id: 'WO-4805', title: 'AHU condensate line clearing', client: 'Atelier House Hotels', property: 'Atelier House Coimbatore', category: 'HVAC', priority: 'High', status: 'Waiting for Parts', assignee: 'Senthil Kumar', date: '2026-10-04', location: 'Roof plant deck' },
  { id: 'WO-4804', title: 'Visitor access reader offline', client: 'Pioneer BioLabs', property: 'Pioneer BioLabs · KGISL Tech Park', category: 'Security', priority: 'High', status: 'In Progress', assignee: 'Rahul Menon', date: '2026-10-04', location: 'East entry' },
  { id: 'WO-4803', title: 'Parking garage drain inspection', client: 'Meridian Workspaces', property: 'Meridian Tech Park Tower 2', category: 'Plumbing', priority: 'Medium', status: 'Completed', assignee: 'Aravind S', date: '2026-10-03', location: 'P2 · Zone C' },
  { id: 'WO-4802', title: 'Classroom thermostat response', client: 'Westward Learning Group', property: 'Westward Learning Campus', category: 'Controls', priority: 'Medium', status: 'Closed', assignee: 'Rahul Menon', date: '2026-10-03', location: 'Room 214' },
  { id: 'WO-4801', title: 'Irrigation valve seasonal shutoff', client: 'Civic Arts Foundation', property: 'Civic Arts Centre · Race Course', category: 'Grounds', priority: 'Low', status: 'Completed', assignee: 'Fathima A', date: '2026-10-03', location: 'South courtyard' },
  { id: 'WO-4800', title: 'Emergency egress light test', client: 'Harborview Health', property: 'Harborview Medical Centre', category: 'Life safety', priority: 'High', status: 'Assigned', assignee: 'Sneha Reddy', date: '2026-10-02', location: 'Level 4 · East wing' },
  { id: 'WO-4799', title: 'Cooling tower basin clean', client: 'Alder Manufacturing', property: 'Alder Manufacturing · SIDCO', category: 'Preventive', priority: 'Medium', status: 'Completed', assignee: 'Senthil Kumar', date: '2026-10-02', location: 'Roof plant' },
  { id: 'WO-4798', title: 'Retail entry mat replacement', client: 'Cedar & Finch Retail', property: 'Cedar & Finch Retail · RS Puram', category: 'Cleaning', priority: 'Low', status: 'Closed', assignee: 'Janani Devi', date: '2026-10-02', location: 'Main entrance' },
  { id: 'WO-4797', title: 'Roll-up door intermittent stop', client: 'Fieldstone Logistics', property: 'Fieldstone Logistics Hub', category: 'Mechanical', priority: 'High', status: 'In Progress', assignee: 'Prabhu Kumar', date: '2026-10-01', location: 'Dock 11' },
  { id: 'WO-4796', title: 'Conference room lighting scene', client: 'Meridian Workspaces', property: 'Meridian Tech Park Tower 2', category: 'Electrical', priority: 'Low', status: 'Completed', assignee: 'Kiran Raj', date: '2026-10-01', location: 'Level 9 · Cedar' },
  { id: 'WO-4795', title: 'Booster pump seal inspection', client: 'Juniper Residential', property: 'Juniper Residences · Saravanampatti', category: 'Plumbing', priority: 'Medium', status: 'Closed', assignee: 'Lakshmi Prasad', date: '2026-09-30', location: 'Basement plant room' },
  { id: 'WO-4794', title: 'Monthly kitchen hood service', client: 'Atelier House Hotels', property: 'Atelier House Coimbatore', category: 'Preventive', priority: 'Medium', status: 'Completed', assignee: 'Aravind S', date: '2026-09-30', location: 'Main kitchen' },
  { id: 'WO-4793', title: 'Cleanroom differential pressure', client: 'Pioneer BioLabs', property: 'Pioneer BioLabs · KGISL Tech Park', category: 'HVAC', priority: 'Critical', status: 'Closed', assignee: 'Senthil Kumar', date: '2026-09-29', location: 'Cleanroom 1' },
  { id: 'WO-4792', title: 'Tree limb clearance after wind', client: 'Civic Arts Foundation', property: 'Civic Arts Centre · Race Course', category: 'Grounds', priority: 'High', status: 'Completed', assignee: 'Fathima A', date: '2026-09-29', location: 'South walkway' }
];

export const schedules = [
  { id: 'PM-2041', title: 'Quarterly air handling inspection', property: 'Meridian Tech Park Tower 2', service: 'HVAC', technician: 'Senthil Kumar', due: '2026-10-09', recurrence: 'Quarterly', status: 'Scheduled' },
  { id: 'PM-2040', title: 'Fire alarm panel functional test', property: 'Harborview Medical Centre', service: 'Life safety', technician: 'Sneha Reddy', due: '2026-10-10', recurrence: 'Monthly', status: 'Scheduled' },
  { id: 'PM-2039', title: 'Domestic water temperature log', property: 'Juniper Residences · Saravanampatti', service: 'Plumbing', technician: 'Lakshmi Prasad', due: '2026-10-11', recurrence: 'Weekly', status: 'Scheduled' },
  { id: 'PM-2038', title: 'Generator load-bank readiness', property: 'Westward Learning Campus', service: 'Electrical', technician: 'Kiran Raj', due: '2026-10-12', recurrence: 'Quarterly', status: 'Scheduled' },
  { id: 'PM-2037', title: 'Kitchen extract filter service', property: 'Atelier House Coimbatore', service: 'HVAC', technician: 'Aravind S', due: '2026-10-12', recurrence: 'Monthly', status: 'Scheduled' },
  { id: 'PM-2036', title: 'Dock door safety inspection', property: 'Fieldstone Logistics Hub', service: 'Mechanical', technician: 'Prabhu Kumar', due: '2026-10-13', recurrence: 'Monthly', status: 'Scheduled' },
  { id: 'PM-2035', title: 'Emergency lighting audit', property: 'Cedar & Finch Retail · RS Puram', service: 'Life safety', technician: 'Sneha Reddy', due: '2026-10-14', recurrence: 'Quarterly', status: 'Scheduled' },
  { id: 'PM-2034', title: 'Lab exhaust calibration', property: 'Pioneer BioLabs · KGISL Tech Park', service: 'Controls', technician: 'Rahul Menon', due: '2026-10-15', recurrence: 'Quarterly', status: 'At risk' },
  { id: 'PM-2033', title: 'Gallery environmental sensor check', property: 'Civic Arts Centre · Race Course', service: 'Controls', technician: 'Rahul Menon', due: '2026-10-16', recurrence: 'Monthly', status: 'Scheduled' },
  { id: 'PM-2032', title: 'Cooling tower water treatment review', property: 'Alder Manufacturing · SIDCO', service: 'HVAC', technician: 'Senthil Kumar', due: '2026-10-17', recurrence: 'Monthly', status: 'Scheduled' },
  { id: 'PM-2031', title: 'Lift traction and door review', property: 'Juniper Residences · Saravanampatti', service: 'Mechanical', technician: 'Prabhu Kumar', due: '2026-10-18', recurrence: 'Quarterly', status: 'Scheduled' },
  { id: 'PM-2030', title: 'Exterior glass and entry inspection', property: 'Meridian Tech Park Tower 2', service: 'Building care', technician: 'Janani Devi', due: '2026-10-20', recurrence: 'Monthly', status: 'Scheduled' }
];

export const invoices = [
  { id: 'INV-9804', client: 'Meridian Workspaces', property: 'Meridian Tech Park Tower 2', issue: '2026-10-01', due: '2026-10-31', amount: 1248000, status: 'Pending' },
  { id: 'INV-9803', client: 'Harborview Health', property: 'Harborview Medical Centre', issue: '2026-10-01', due: '2026-10-31', amount: 1892000, status: 'Paid' },
  { id: 'INV-9802', client: 'Juniper Residential', property: 'Juniper Residences · Saravanampatti', issue: '2026-09-30', due: '2026-10-30', amount: 865000, status: 'Partially Paid' },
  { id: 'INV-9801', client: 'Westward Learning Group', property: 'Westward Learning Campus', issue: '2026-09-30', due: '2026-10-30', amount: 1430000, status: 'Paid' },
  { id: 'INV-9800', client: 'Atelier House Hotels', property: 'Atelier House Coimbatore', issue: '2026-09-28', due: '2026-10-28', amount: 1164000, status: 'Pending' },
  { id: 'INV-9799', client: 'Fieldstone Logistics', property: 'Fieldstone Logistics Hub', issue: '2026-09-26', due: '2026-10-26', amount: 972000, status: 'Overdue' },
  { id: 'INV-9798', client: 'Cedar & Finch Retail', property: 'Cedar & Finch Retail · RS Puram', issue: '2026-09-25', due: '2026-10-25', amount: 624000, status: 'Paid' },
  { id: 'INV-9797', client: 'Pioneer BioLabs', property: 'Pioneer BioLabs · KGISL Tech Park', issue: '2026-09-23', due: '2026-10-23', amount: 1588000, status: 'Paid' }
];

export const notifications = [
  { id: 'NT-701', title: 'Technician dispatched', body: 'Kiran Raj has been dispatched to Harborview Medical Centre.', time: '8 min ago', type: 'dispatch', unread: true },
  { id: 'NT-700', title: 'Work order completed', body: 'WO-4818 · Air handling unit filter change is ready for review.', time: '42 min ago', type: 'success', unread: true },
  { id: 'NT-699', title: 'Maintenance due soon', body: 'Fire alarm panel test at Harborview is scheduled for Friday.', time: '2 hours ago', type: 'calendar', unread: true },
  { id: 'NT-698', title: 'Invoice available', body: 'Invoice INV-9804 for Meridian Tower is ready to view.', time: 'Yesterday', type: 'invoice', unread: false }
];

export const messages = [
  { id: 'MS-441', sender: 'Kavya Raman', company: 'Meridian Workspaces', subject: 'After-hours access for chiller inspection', preview: 'The plant room access code has been updated for this evening...', time: '9:12 AM', unread: true },
  { id: 'MS-440', sender: 'Dr. Naveen Varma', company: 'Harborview Health', subject: 'Patient wing lighting follow-up', preview: 'Could you share the completion photos with our facilities lead?', time: '8:46 AM', unread: true },
  { id: 'MS-439', sender: 'Senthil Kumar', company: 'Technician', subject: 'WO-4821 · Chiller 2 inspection', preview: 'Vibration is isolated to the secondary pump coupling. Reviewing...', time: '8:18 AM', unread: false },
  { id: 'MS-438', sender: 'Priya Nair', company: 'Juniper Residential', subject: 'Lobby access window', preview: 'The contractor can access the south riser from 10:30 to 12:00.', time: 'Yesterday', unread: false }
];

export const blogPosts = [
  {
    "id": "BL-108",
    "slug": "preventive-maintenance-guide",
    "title": "A practical guide to preventive maintenance planning",
    "category": "Preventive maintenance",
    "date": "Oct 06, 2026",
    "read": "7 min read",
    "author": "Divya Narayanan",
    "featured": true,
    "excerpt": "Connect asset consequence, condition and site use so planned work is both worthwhile and achievable.",
    "cardExcerpt": "Plan maintenance by risk, condition and use.",
    "description": "A practical framework for prioritising assets, building a maintainable service rhythm and turning inspection findings into owned follow-up.",
    "image": "/assets/services/preventive-maintenance.jpg",
    "imageAlt": "Technician inspecting an outdoor air-conditioning unit during a planned maintenance visit.",
    "intro": "A preventive programme is not valuable simply because tasks appear on a calendar. It works when the schedule reflects the consequence of failure, the condition of equipment and the hours a site can safely make available.",
    "sections": [
      {
        "id": "prioritise-assets",
        "title": "Start with consequence, not a long asset list",
        "paragraphs": [
          "Begin with equipment whose failure could affect safety, business continuity, essential comfort or an important building service. A short, agreed criticality review is often more useful than trying to make every asset equally urgent.",
          "Use what is already known: age, operating conditions, repeat faults, available redundancy and manufacturer guidance. Record uncertainty rather than filling gaps with assumptions; a reliable plan can improve as asset information improves."
        ],
        "list": [
          "Confirm the asset and its location are identifiable.",
          "Note failure history, known condition and operational impact.",
          "Name who can approve access, shutdowns and follow-up work."
        ]
      },
      {
        "id": "build-rhythm",
        "title": "Build a service rhythm the site can support",
        "paragraphs": [
          "Set frequencies from the asset, local requirements and operating context—not from a blanket interval. A plant room, a teaching space and a loading dock have different access constraints and usage patterns.",
          "Coordinate visits with operating windows and technician capacity. Leave room for isolation, safe access and the time needed to record findings; a schedule that cannot be completed consistently will not provide dependable evidence."
        ]
      },
      {
        "id": "close-findings",
        "title": "Make inspection findings part of the plan",
        "paragraphs": [
          "A completed checklist is only the beginning. Give each actionable observation an owner, priority and next review date, then link it to the appropriate work order or specialist decision.",
          "Review repeat findings alongside missed tasks and reactive callouts. That conversation helps teams adjust the plan based on real building history rather than treating the calendar as fixed."
        ]
      }
    ],
    "keyInsights": [
      "Prioritise work by consequence and condition.",
      "Schedule around real access and operating windows.",
      "Give every finding an owner and a recorded next step."
    ],
    "conclusion": "Choose one critical system, review its work history and agree the next service cycle with the site team. A small, well-documented loop is a sound starting point for a wider programme.",
    "tags": [
      "Asset care",
      "Maintenance planning",
      "Site operations"
    ],
    "cta": {
      "title": "Make planned work easier to manage",
      "body": "Review the sample preventive-maintenance scope and the information a site plan should clarify.",
      "label": "Explore preventive maintenance",
      "href": "#/services/preventive-maintenance"
    },
    "relatedSlugs": [
      "seasonal-hvac-transition-checklist",
      "critical-spares-maintenance",
      "work-order-data-that-matters"
    ]
  },
  {
      "id": "BL-111",
      "slug": "electrical-safety-facilities-routine",
      "title": "Electrical safety is a facilities routine, not a checklist",
      "category": "Electrical safety",
      "date": "Oct 10, 2026",
      "read": "6 min read",
      "author": "Arjun Menon",
      "excerpt": "Coordinate current asset records, competent people, approved work controls and a clear return-to-service handover.",
      "cardExcerpt": "Safer electrical work through clear controls.",
      "description": "A facilities operations approach to electrical risk: asset information, authorised work, planned access and reliable close-out records.",
      "image": "/assets/blog/electrical-safety-routine.jpg",
      "imageAlt": "Representative facilities technician in protective equipment inspecting a commercial electrical switchboard.",
      "intro": "Electrical safety depends on consistent site controls, not a single audit or completed checklist. Facilities teams help make safe work possible by keeping asset information current, planning access, involving authorised specialists and making each handover clear.",
      "sections": [
        {
          "id": "current-electrical-records",
          "title": "Keep the electrical asset picture current",
          "paragraphs": [
            "Start with an understandable record of distribution boards, critical circuits, locations, known defects and the drawings or schedules used by the site team. A label or drawing should not be treated as current until the authorised person responsible for the system has confirmed it.",
            "Record changes after approved works, including what was altered, who verified it and where supporting evidence is held. Good information helps maintenance teams plan a visit and helps site contacts understand which services could be affected."
          ],
          "list": [
            "Use stable asset names and clear room or panel references.",
            "Keep known defects and follow-up decisions visible.",
            "Record who owns technical approval and document updates."
          ]
        },
        {
          "id": "plan-authorised-work",
          "title": "Plan work around authorised roles and site access",
          "paragraphs": [
            "Agree the work window, affected areas, communication route and approval path before attendance. The site’s permit, isolation and safe-working arrangements must be set by competent, authorised people under the applicable procedures; a facilities schedule does not replace those controls.",
            "Make escalation responsibilities clear when an inspection identifies a concern outside the agreed scope. The right response may involve restricting access, involving the client’s safety lead or arranging a specialist review rather than treating the issue as a routine repair."
          ]
        },
        {
          "id": "close-electrical-work",
          "title": "Close the work with evidence and ownership",
          "paragraphs": [
            "Capture the work completed, observations, required test evidence, outstanding defects and any temporary operating restriction. Record who reviewed the handover and who is responsible for deciding when the affected system can return to normal service.",
            "Review open electrical actions with the asset owner instead of leaving them inside a closed work order. This makes risk visible across maintenance, operations and any specialist contractor involved."
          ]
        }
      ],
      "keyInsights": [
        "Treat drawings and labels as records that need an accountable owner.",
        "Keep technical approvals and safe-work controls with authorised people.",
        "Carry defects and return-to-service decisions into a named follow-up."
      ],
      "conclusion": "Choose one electrical system and check whether its asset record, approval route and open actions are easy for the site team to find. A short review with the authorised technical contact can expose gaps before the next planned visit.",
      "tags": [
        "Electrical maintenance",
        "Authorised work",
        "Facilities safety"
      ],
      "cta": {
        "title": "Make electrical maintenance easier to coordinate",
        "body": "Review a sample scope for planned electrical checks, fault response and specialist coordination.",
        "label": "Explore electrical maintenance",
        "href": "#/services/electrical-maintenance"
      },
      "relatedSlugs": [
        "safety-walkthroughs",
        "preventive-maintenance-guide",
        "facility-emergency-response-playbook"
      ]
    },
    {
      "id": "BL-110",
      "slug": "building-automation-alert-playbook",
      "title": "Building automation alerts need an operating playbook",
      "category": "Building controls",
      "date": "Oct 02, 2026",
      "read": "6 min read",
      "author": "Karthik Subramanian",
      "excerpt": "Turn alarms into useful action by agreeing priority, ownership, escalation and a reliable close-out record.",
      "cardExcerpt": "Turn alarms into owned, trackable actions.",
      "description": "A practical way to connect building-management alerts with work orders, site roles and trustworthy building-system data.",
      "image": "/assets/blog/building-automation-alert-playbook.jpg",
      "imageAlt": "Representative facilities operator reviewing building automation alerts beside control-room equipment.",
      "intro": "A building-management system can surface many alarms, but an alert is useful only when a person knows what it means and what to do next. A simple operating playbook connects the signal to site context, an accountable role and a recorded outcome.",
      "sections": [
        {
          "id": "define-alert-purpose",
          "title": "Decide what each alert is meant to tell you",
          "paragraphs": [
            "Begin with a short list of alerts that relate to critical equipment, occupant comfort or an agreed operating risk. Confirm the point name, affected asset, expected operating context and the person who can interpret the signal before asking teams to respond to it.",
            "Separate an advisory observation from a condition that needs prompt investigation. Avoid assigning arbitrary thresholds: use values and response rules approved for the equipment and site, and record why each alert matters."
          ],
          "list": [
            "Map each point to a known asset and location.",
            "Agree severity, response window and escalation owner.",
            "Retire duplicate or unowned notifications after review."
          ]
        },
        {
          "id": "connect-alert-to-work",
          "title": "Connect an alert to a person and a work record",
          "paragraphs": [
            "Define who acknowledges an alert during normal occupancy, outside operating hours and when the usual contact is unavailable. A clear backup route reduces the chance that a notification is seen but never assigned.",
            "Where an alert becomes a work order, retain the originating point, timestamp, site context and action taken. A technician should be able to distinguish a confirmed fault from a control message that needs investigation."
          ]
        },
        {
          "id": "maintain-trustworthy-controls",
          "title": "Keep the controls and the response record trustworthy",
          "paragraphs": [
            "Review point labels, sensor condition, time settings and control schedules with the appropriate building-controls specialist. Changes to sequences or alarm logic should follow the site’s approval and change-control process.",
            "Look at recurring alerts alongside service history, occupancy and maintenance activity. The aim is not to suppress inconvenient messages; it is to understand the cause and improve the signal, the process or the asset care plan."
          ]
        }
      ],
      "keyInsights": [
        "An alert needs a known asset, a defined priority and a human owner.",
        "Link the original signal to the investigation and recorded outcome.",
        "Review recurring alarms with a controls specialist before changing logic."
      ],
      "conclusion": "Select one frequently repeated alert and follow it from the building-management point to the final work record. If the owner, decision or close-out is unclear, refine that small pathway before expanding monitoring.",
      "tags": [
        "Building management systems",
        "Alert response",
        "Connected operations"
      ],
      "cta": {
        "title": "Bring building signals into a clear service rhythm",
        "body": "Explore sample facilities support for controls, planned maintenance and service reporting.",
        "label": "Explore facilities services",
        "href": "#/services/integrated-facilities-management"
      },
      "relatedSlugs": [
        "work-order-data-that-matters",
        "facility-management-data-quality",
        "building-energy-baselines"
      ]
    },
    {
      "id": "BL-109",
      "slug": "asset-lifecycle-plan-condition-renewal",
      "title": "An asset lifecycle plan that connects condition to renewal",
      "category": "Asset planning",
      "date": "Sep 17, 2026",
      "read": "6 min read",
      "author": "Divya Narayanan",
      "excerpt": "Bring condition, operational consequence, repair history and replacement assumptions into one reviewable plan.",
      "cardExcerpt": "Plan renewals by condition and impact.",
      "description": "A facilities framework for connecting asset condition and service history to maintenance, repair and renewal decisions.",
      "image": "/assets/blog/asset-lifecycle-condition-review.jpg",
      "imageAlt": "Representative maintenance engineer checking commercial chiller condition during an asset lifecycle review.",
      "intro": "An asset list becomes a lifecycle plan when it helps people decide what to maintain, investigate or renew—and when. The useful starting point is a consistent view of condition, service history, operational consequence and the assumptions behind each decision.",
      "sections": [
        {
          "id": "build-condition-record",
          "title": "Build a condition record people can compare",
          "paragraphs": [
            "Use a stable asset identifier and record the location, known age or installation reference, recent service history, repeat faults and available redundancy. Add observations from competent inspections and note when information is missing rather than estimating a remaining life without evidence.",
            "A consistent record makes it easier to compare similar assets across a building or portfolio. It also helps a reviewer understand whether a repair is a one-off event or part of a pattern that merits further assessment."
          ]
        },
        {
          "id": "compare-lifecycle-options",
          "title": "Compare maintenance, repair and renewal options",
          "paragraphs": [
            "For each priority asset, describe the practical options and the consequences of waiting. Consider condition, availability of parts, operating impact, energy use where relevant, dependencies, access requirements and the disruption involved in a replacement.",
            "Use whole-life cost and risk information that the organisation can substantiate. Include the source, scope and timing of estimates, and distinguish an early planning assumption from an approved budget or committed project."
          ],
          "list": [
            "What evidence supports the condition assessment?",
            "What service or operational dependency could change the decision?",
            "Which estimate, lead time or approval still needs confirmation?"
          ]
        },
        {
          "id": "make-plan-reviewable",
          "title": "Make the plan reviewable, not just presentable",
          "paragraphs": [
            "Group proposed actions by priority and the planning horizon used by the organisation. Name an owner for each next step, identify decisions that require a specialist review and show which assumptions should be revisited before funding or work is approved.",
            "Update the plan after a major failure, building change, new inspection or material change in supplier availability. A living record supports a more useful conversation between facilities, finance, procurement and the people who depend on the asset."
          ]
        }
      ],
      "keyInsights": [
        "Record condition, consequence and uncertainty separately.",
        "Compare options using sourced assumptions, not invented savings.",
        "Give each renewal decision an owner and a review trigger."
      ],
      "conclusion": "Choose a small group of high-consequence assets and document the evidence, options and decisions still required. A concise, reviewable plan is more useful than a precise-looking replacement date that the site cannot support.",
      "tags": [
        "Asset lifecycle",
        "Capital planning",
        "Condition review"
      ],
      "cta": {
        "title": "Connect asset history to day-to-day service",
        "body": "Explore a sample maintenance scope that links planned care, service records and follow-up decisions.",
        "label": "Explore building maintenance",
        "href": "#/services/facility-maintenance"
      },
      "relatedSlugs": [
        "preventive-maintenance-guide",
        "critical-spares-maintenance",
        "facility-management-data-quality"
      ]
    },
  {
    "id": "BL-122",
    "slug": "facilities-service-mobilisation-first-90-days",
    "title": "The first 90 days of a facilities service mobilisation",
    "category": "Service mobilisation",
    "date": "Oct 12, 2026",
    "read": "6 min read",
    "author": "Ananya Iyer",
    "excerpt": "Build a dependable start with clear responsibilities, verified site information and a review rhythm that can catch gaps early.",
    "cardExcerpt": "Start service with clear roles and site data.",
    "description": "A practical mobilisation framework for confirming service scope, asset information, access, escalation and early review checkpoints.",
    "image": "/assets/blog/facilities-mobilisation-planning.jpg",
    "imageAlt": "Representative facilities manager and technician reviewing a building plan during service mobilisation.",
    "intro": "A facilities service launch is a change to how a building is cared for, not just a contract start date. A calm first 90 days gives the site team time to validate what is known, surface missing information and make responsibilities clear before routine work accelerates.",
    "sections": [
      {
        "id": "confirm-day-one-baseline",
        "title": "Confirm the operating baseline before work begins",
        "paragraphs": [
          "Walk the site with the client contact and the people who will coordinate daily service. Confirm occupied hours, access routes, critical rooms, known restrictions, escalation contacts and the tasks that must be available on day one. Record differences between the written scope and what the building can actually support.",
          "Create a short list of information still to verify, such as current asset schedules, drawings, specialist service agreements or permit arrangements. Assign an owner and a due date to each open item rather than treating an incomplete record as an approved baseline."
        ],
        "list": [
          "Name the client and service-side decision makers.",
          "Record site access, operating windows and critical dependencies.",
          "Mark unknown asset data as unverified until checked."
        ]
      },
      {
        "id": "give-information-an-owner",
        "title": "Give information and service handoffs an owner",
        "paragraphs": [
          "Agree how a request is received, triaged, assigned, updated and closed. Define who can approve a change in scope and who must be told when work affects occupants, a critical system or another contractor. A simple responsibility map prevents teams from assuming that somebody else owns the next step.",
          "Use stable asset and location references in work records. If legacy naming is inconsistent, map old names to a confirmed site reference and keep the mapping visible while records are corrected. Avoid bulk relabeling until the client and technical leads agree the source of truth."
        ]
      },
      {
        "id": "build-safe-site-routine",
        "title": "Build the safe site routine before increasing activity",
        "paragraphs": [
          "Review induction, permits, isolations, key control, contractor sign-in and out-of-hours escalation with the people authorized to manage those controls. The mobilisation checklist supports the site's rules; it does not replace competent technical approval or statutory requirements.",
          "Start with a manageable set of planned tasks and confirm how completion evidence is recorded. Where a specialist inspection or commissioning step is required, identify the qualified provider and agree who reviews its report before the asset is returned to normal operation."
        ]
      },
      {
        "id": "review-the-first-months",
        "title": "Use early reviews to close gaps, not assign blame",
        "paragraphs": [
          "Hold short reviews after the first weeks and again near the end of the initial quarter. Look at response ownership, repeat requests, missed access, incomplete records and any work that depended on an unconfirmed assumption. Separate a genuine delivery issue from a site constraint that needs a client decision.",
          "Publish a small action list with owners and dates, then carry unresolved items into the regular service review. The aim is a service rhythm that the building can sustain, not a launch dashboard that looks complete while important questions remain open."
        ]
      }
    ],
    "keyInsights": [
      "Verify site conditions and scope assumptions before routine work ramps up.",
      "Assign clear owners to information, approvals and service handoffs.",
      "Use early reviews to resolve open risks with named actions."
    ],
    "conclusion": "A strong start is visible in the quality of the handoffs: the site knows who to contact, teams can find reliable asset references, and open questions have owners. Begin with those basics and make the first-quarter review a practical checkpoint for improvement.",
    "tags": ["Mobilisation", "Service delivery", "Site coordination"],
    "cta": {
      "title": "Coordinate building services from a clear baseline",
      "body": "Explore an illustrative integrated facilities scope for planned work, service requests and site reporting.",
      "label": "Explore integrated facilities management",
      "href": "#/services/integrated-facilities-management"
    },
    "relatedSlugs": ["preventive-maintenance-guide", "vendor-management-facilities", "work-order-data-that-matters"]
  },
  {
    "id": "BL-121",
    "slug": "commercial-hvac-maintenance-routine",
    "title": "A practical HVAC maintenance routine for commercial buildings",
    "category": "HVAC maintenance",
    "date": "Oct 08, 2026",
    "read": "6 min read",
    "author": "Karthik Subramanian",
    "excerpt": "Plan HVAC checks around equipment condition, operating hours and qualified technical review—not a generic calendar alone.",
    "cardExcerpt": "Plan HVAC checks around condition and use.",
    "description": "A facilities guide to organizing commercial HVAC inspections, service records, occupant communication and escalation.",
    "image": "/assets/blog/hvac-maintenance-routine.jpg",
    "imageAlt": "Representative HVAC engineer checking a commercial chiller control panel during planned maintenance.",
    "intro": "A useful HVAC maintenance routine protects comfort and equipment reliability while respecting the building's operating pattern. The right schedule depends on the system, manufacturer guidance, site risks and qualified technical advice; a generic task list is only a starting point.",
    "sections": [
      {
        "id": "map-hvac-systems",
        "title": "Map the systems that serve each occupied area",
        "paragraphs": [
          "Connect plant equipment to the zones it serves, available redundancy, control points and known access limits. Confirm which drawings and asset identifiers are current with the responsible technical lead. A clear map helps teams understand the impact of a shutdown before a service visit is booked.",
          "Record operating schedules, seasonal changes, complaint patterns and any agreed indoor conditions. These records help an engineer interpret a reading in context; they do not substitute for calibrated measurement or a site-specific engineering assessment."
        ]
      },
      {
        "id": "plan-maintenance-windows",
        "title": "Plan inspections around the work the building must keep doing",
        "paragraphs": [
          "Combine manufacturer-recommended tasks, statutory obligations where applicable, site history and qualified condition assessments into the proposed schedule. Confirm which tasks can occur during normal operation and which require isolation, specialist attendance or a planned outage.",
          "Agree access, occupant notices, alternate cooling arrangements and escalation contacts before work begins. If a critical space or process could be affected, ask the asset owner to approve the operating plan rather than relying on a technician to decide the business impact alone."
        ],
        "list": [
          "Check filters, coils, drainage and visible condition at the approved interval.",
          "Record exceptions and measurements with units and equipment references.",
          "Escalate unusual noise, vibration, leakage or repeated alarms for competent review."
        ]
      },
      {
        "id": "keep-hvac-records-useful",
        "title": "Make service records useful for the next visit",
        "paragraphs": [
          "Close each job with the equipment reference, task completed, observations, parts used, test evidence required by the procedure and the name of the person responsible for follow-up. Distinguish completed work from recommendations that still need an engineering decision or quotation.",
          "Review repeated callouts alongside operating changes, control schedules and prior maintenance. The pattern may point to a condition worth investigating, but it should be confirmed by a qualified HVAC specialist before the maintenance plan or control sequence is changed."
        ]
      },
      {
        "id": "review-routine-seasonally",
        "title": "Review the routine when building use or conditions change",
        "paragraphs": [
          "Revisit planned tasks after a significant occupancy change, refurbishment, control-system update, equipment failure or seasonal transition. Keep the reason for any schedule change and its approval in the service record so future teams can understand what was intended.",
          "A short quarterly review between facilities, the site contact and the responsible technical specialist can identify overdue evidence, unresolved recommendations and opportunities to coordinate access. Use it to agree the next actions, not to promise energy or comfort outcomes without measurement."
        ]
      }
    ],
    "keyInsights": [
      "Build the maintenance plan from confirmed assets and qualified guidance.",
      "Coordinate outages and occupant impact before specialist work is booked.",
      "Keep observations, approvals and follow-up decisions in the record."
    ],
    "conclusion": "Choose one critical HVAC system and trace its asset map, next service window and last handover. If the responsible contact cannot see what was checked or what remains unresolved, improve that record before expanding the task list.",
    "tags": ["HVAC", "Planned maintenance", "Building operations"],
    "cta": {
      "title": "Plan maintenance for critical cooling equipment",
      "body": "Review a sample HVAC service scope with access planning, qualified checks and clear follow-up.",
      "label": "Explore HVAC and chiller maintenance",
      "href": "#/services/hvac-chiller-maintenance"
    },
    "relatedSlugs": ["seasonal-hvac-transition-checklist", "preventive-maintenance-guide", "indoor-air-quality-workplace"]
  },
  {
    "id": "BL-120",
    "slug": "energy-efficiency-operating-schedules",
    "title": "Energy efficiency often starts with the operating schedule",
    "category": "Energy management",
    "date": "Sep 30, 2026",
    "read": "6 min read",
    "author": "Divya Narayanan",
    "excerpt": "Compare meter data, occupancy and control schedules before investing in new equipment or promising savings.",
    "cardExcerpt": "Check site data before energy upgrades.",
    "description": "A practical facilities method for reviewing building operating hours, controls, energy evidence and low-risk efficiency actions.",
    "image": "/assets/blog/energy-efficiency-operations.jpg",
    "imageAlt": "Representative facilities manager reviewing energy readings on a tablet beside commercial plant controls.",
    "intro": "Energy improvements do not always begin with new technology. A careful review of operating hours, control schedules, occupancy and meter data can reveal where a building is running outside its intended pattern—and where more evidence is needed before a change is approved.",
    "sections": [
      {
        "id": "establish-meter-boundaries",
        "title": "Understand what each meter actually represents",
        "paragraphs": [
          "Map available meters to buildings, floors or major systems and confirm their reporting interval, units and known gaps. Check whether a value is measured or estimated and whether the source includes shared services, tenant loads or equipment outside the facilities team's control.",
          "Keep weather, occupancy and operating changes alongside the readings. A simple before-and-after comparison can be misleading when the building was used differently or when a meter, tariff or control strategy changed during the review period."
        ]
      },
      {
        "id": "compare-schedules-and-use",
        "title": "Compare programmed hours with real site use",
        "paragraphs": [
          "Review HVAC start and stop schedules, lighting controls, hot-water circulation and other agreed plant routines with the relevant specialist. Look for unnecessary operation during confirmed unoccupied periods, while checking that pre-conditioning, safety and process requirements are not compromised.",
          "Speak with the people who use the space before changing a schedule. A meeting room that appears empty in a building system may have a valid cleaning, security or after-hours use that is recorded elsewhere. Confirm the exception with a site contact and document the approved change."
        ],
        "list": [
          "Identify the system owner and the approved schedule source.",
          "Check exceptions for cleaning, security, events and critical rooms.",
          "Record the before-state, approval and review date for any adjustment."
        ]
      },
      {
        "id": "test-low-risk-actions",
        "title": "Trial adjustments with a clear measurement plan",
        "paragraphs": [
          "Start with a bounded change that an authorized controls specialist can implement and reverse. Define what will be observed, the comparison period and the operating conditions that would trigger a rollback. Do not alter safety interlocks or sequences outside the approved change process.",
          "Monitor energy data together with occupant feedback and system alarms. If comfort or operational risk changes, pause the trial and review it with the responsible technical lead. A credible outcome includes the limitations and conditions of the measurement, not just a headline percentage."
        ]
      },
      {
        "id": "keep-an-energy-action-log",
        "title": "Keep the action and evidence in one reviewable record",
        "paragraphs": [
          "Record the proposed action, accountable owner, approval, date implemented and the data source used to assess it. Separate measured results from estimates and note any simultaneous changes that make attribution uncertain.",
          "Review open actions at a regular operations meeting. If a change is kept, update the schedule documentation and handover notes so a future technician does not unknowingly restore an older setting. If it is reversed, record why and what additional evidence would be useful next time."
        ]
      }
    ],
    "keyInsights": [
      "Verify meter boundaries before comparing energy readings.",
      "Check real site use and exceptions before changing control schedules.",
      "Measure and document trials without claiming unsupported savings."
    ],
    "conclusion": "Start with one building system and compare its approved schedule with actual site use. Make any adjustment through the authorized change process, observe both energy and occupant impact, and record the evidence before considering a wider rollout.",
    "tags": ["Energy efficiency", "Building controls", "Measurement"],
    "cta": {
      "title": "Connect operating data to building care",
      "body": "Explore sample energy-management support for reviews, metering context and coordinated service actions.",
      "label": "Explore energy management",
      "href": "#/services/energy-management"
    },
    "relatedSlugs": ["building-energy-baselines", "facility-management-data-quality", "building-automation-alert-playbook"]
  },
  {
    "id": "BL-119",
    "slug": "commercial-water-systems-leak-prevention",
    "title": "A facilities approach to commercial water-system leak prevention",
    "category": "Water systems",
    "date": "Sep 22, 2026",
    "read": "6 min read",
    "author": "Arjun Menon",
    "excerpt": "Use asset maps, consumption context and safe escalation to spot water-system concerns before they become larger disruptions.",
    "cardExcerpt": "Use site context to catch leaks early.",
    "description": "How facilities teams can organize water asset information, review unusual consumption and coordinate qualified leak investigation.",
    "image": "/assets/blog/water-systems-leak-prevention.jpg",
    "imageAlt": "Representative plumbing technician checking a commercial water meter and pipework during an inspection.",
    "intro": "Water loss can be difficult to locate in a busy commercial property, especially when meters serve multiple areas or records are incomplete. A practical prevention routine combines site knowledge, consumption context, prompt reporting and qualified investigation rather than assuming that one reading proves a leak.",
    "sections": [
      {
        "id": "map-water-isolation-points",
        "title": "Map meters, isolation points and critical water users",
        "paragraphs": [
          "Record which meter serves which area, where isolation valves are located and which systems depend on continuous supply. Verify the information with the responsible site and technical contacts before relying on it during an incident. Mark unknowns clearly and arrange a safe, approved verification visit.",
          "Keep a list of sensitive spaces, process loads and any required water-quality or temperature controls. A facilities response should not isolate a system solely because a single reading appears unusual; the impact and authorized decision maker must be understood first."
        ]
      },
      {
        "id": "notice-consumption-patterns",
        "title": "Look for patterns in consumption, not a single spike",
        "paragraphs": [
          "Compare interval readings with occupancy, cleaning, irrigation, cooling-tower activity and known maintenance work. Confirm meter units, reporting delays and the property boundary before treating an apparent increase as abnormal. Where only monthly data exists, ask whether a more useful reading interval is feasible.",
          "Create a simple escalation threshold using site history and the owner's risk tolerance, not an invented universal number. The threshold should prompt a human review; it should not automatically shut down equipment or issue a fault diagnosis without validation."
        ],
        "list": [
          "Log the date, area, meter reference and operating context.",
          "Check recent contractor work and any temporary hose or bypass.",
          "Escalate visible damage or suspected contamination immediately through site procedures."
        ]
      },
      {
        "id": "coordinate-qualified-investigation",
        "title": "Coordinate a safe investigation with the right specialist",
        "paragraphs": [
          "When a concern is credible, agree access, affected occupants, temporary controls and the person authorized to approve isolation. Ask a competent plumbing specialist to trace the issue and document findings; facilities coordination cannot substitute for technical diagnosis or statutory responsibilities.",
          "If a shutdown is necessary, confirm the service impact, communication plan and restoration checks before starting. Keep potable, fire-protection, cooling and process systems clearly distinguished so an intervention in one circuit does not inadvertently affect another."
        ]
      },
      {
        "id": "close-the-water-incident",
        "title": "Close the incident with an updated record",
        "paragraphs": [
          "Record what was found, what was isolated or repaired, who completed and reviewed the work, and any follow-up inspection required. Update valve and meter records after approved changes so later responders do not rely on an outdated diagram.",
          "Review recurring readings or repeat repairs with the asset owner. A small pattern may justify a specialist condition assessment, but replacement decisions should use verified evidence, consequence and an agreed business case rather than an isolated alarm or anecdote."
        ]
      }
    ],
    "keyInsights": [
      "Know meter boundaries and isolation responsibilities before an incident.",
      "Interpret water readings with occupancy and system context.",
      "Keep qualified diagnosis, approvals and restoration checks documented."
    ],
    "conclusion": "Choose one high-use area and verify its meter, isolation point and escalation owner. If the record is uncertain, plan a safe technical verification before an incident makes the decision urgent.",
    "tags": ["Water systems", "Leak prevention", "Site response"],
    "cta": {
      "title": "Coordinate plumbing and water-system support",
      "body": "Review a sample service scope for inspections, responsive work and clear site handovers.",
      "label": "Explore plumbing and water systems",
      "href": "#/services/plumbing-water-systems"
    },
    "relatedSlugs": ["facility-emergency-response-playbook", "preventive-maintenance-guide", "work-order-data-that-matters"]
  },
  {
    "id": "BL-118",
    "slug": "planned-maintenance-around-occupancy",
    "title": "Plan building maintenance around occupancy, not against it",
    "category": "Workplace operations",
    "date": "Sep 14, 2026",
    "read": "5 min read",
    "author": "Nandhini Raj",
    "excerpt": "Coordinate noisy, disruptive or access-sensitive tasks with the people who use the building and the site team that supports them.",
    "cardExcerpt": "Schedule disruptive work around people.",
    "description": "A practical method for sequencing planned building work around occupancy, access, communication and safe return to service.",
    "image": "/assets/services/civil-fabric-maintenance.jpg",
    "imageAlt": "Facilities technician carrying out a small building-fabric repair in a commercial interior.",
    "intro": "Planned maintenance is more likely to succeed when its timing reflects how people use a building. Facilities teams can reduce avoidable disruption by classifying the impact of each task, agreeing access windows and keeping a clear route for changes when a site day does not go to plan.",
    "sections": [
      {
        "id": "classify-occupant-impact",
        "title": "Classify the task by its effect on people and services",
        "paragraphs": [
          "Separate routine, low-impact checks from work that creates noise, dust, restricted access, water interruption or a temporary change to building systems. Identify who could be affected and whether the work overlaps with patient care, teaching, deliveries, customer service or a critical production window.",
          "Do not treat an empty desk or room booking as proof that an area is unused. Confirm special operating periods with the appropriate department contact, site security and any client representative responsible for the space."
        ]
      },
      {
        "id": "agree-work-windows",
        "title": "Agree work windows and practical contingencies early",
        "paragraphs": [
          "Choose a time that gives the technician safe access and enough time to test and hand back the system. Consider setup, permits, specialist availability, cleaning after the work and the possibility that an inspection may reveal a defect requiring escalation.",
          "For a task that could run long, agree a stop point and contingency before work begins. The site contact should know who can approve an extension, who communicates with occupants and what temporary arrangement applies if the system cannot be restored as planned."
        ],
        "list": [
          "Confirm access, noise and isolation constraints with the area owner.",
          "Send clear notices with timing, impact and a contact route.",
          "Record completion or rescheduling in the service calendar."
        ]
      },
      {
        "id": "communicate-with-site-users",
        "title": "Communicate what will change and who can answer questions",
        "paragraphs": [
          "Use plain language to explain which area or service is affected, the expected duration and any action occupants need to take. Keep notices consistent across reception, facilities contacts and contractor briefings so people do not receive conflicting information.",
          "Avoid promising a precise finish time when specialist findings may change the scope. Give an update point and a named contact instead; timely, honest communication is more useful than a confident estimate that becomes inaccurate."
        ]
      },
      {
        "id": "verify-return-to-service",
        "title": "Verify the handback before the area returns to normal use",
        "paragraphs": [
          "Complete the agreed operational and safety checks, remove temporary barriers when authorized and confirm any residual restriction. The person responsible for the system should approve its return to normal service under the applicable site procedures.",
          "Close the work record with what was done, what remains open and who owns each next step. Review missed access or repeat disruption during the next planning meeting and adjust the schedule for similar work."
        ]
      }
    ],
    "keyInsights": [
      "Classify maintenance by its likely impact on occupants and services.",
      "Agree access windows, notices and contingencies before attendance.",
      "Confirm safe handback and record unresolved actions."
    ],
    "conclusion": "For the next disruptive task, name the affected area owner, confirm the safest work window and agree who approves return to service. A short coordination step can make planned work more predictable for both occupants and technicians.",
    "tags": ["Workplace planning", "Occupant communication", "Planned work"],
    "cta": {
      "title": "Make planned work easier to coordinate",
      "body": "Explore sample preventive-maintenance support shaped around access and operating hours.",
      "label": "Explore preventive maintenance",
      "href": "#/services/preventive-maintenance"
    },
    "relatedSlugs": ["preventive-maintenance-guide", "safety-walkthroughs", "indoor-air-quality-workplace"]
  },
  {
    "id": "BL-117",
    "slug": "contractor-coordination-permit-to-work",
    "title": "Make contractor coordination part of the safe-work plan",
    "category": "Contractor management",
    "date": "Sep 06, 2026",
    "read": "6 min read",
    "author": "Arjun Menon",
    "excerpt": "Align scope, access, permit ownership, isolations and handover before specialist work reaches a live site.",
    "cardExcerpt": "Agree permits and handovers before work.",
    "description": "A facilities coordination guide for preparing specialist contractors, confirming site controls and closing work with accountable handovers.",
    "image": "/assets/blog/contractor-work-coordination.jpg",
    "imageAlt": "Representative facilities supervisor and specialist contractor in PPE reviewing a work plan outside a plant room.",
    "intro": "A specialist contractor may understand a technical task well while still needing site-specific information to work safely. Facilities teams help connect the agreed scope to local access, permit, isolation, communication and handback arrangements without replacing the client’s authorized safety controls.",
    "sections": [
      {
        "id": "define-contractor-scope",
        "title": "Define the work boundary and the people who approve it",
        "paragraphs": [
          "Describe the asset, location, intended task, exclusions and any interfaces with other trades. Confirm who can authorize the work, issue permits, approve isolations and accept the completed handover. Do not rely on a purchase order alone to define a safe operating boundary.",
          "Where a contractor's method or scope changes after attendance, stop and refer the change to the person responsible for approval. A facilities coordinator can help document the request but should not authorize technical work outside their competence or delegated authority."
        ]
      },
      {
        "id": "prepare-site-access",
        "title": "Prepare access, induction and local operating information",
        "paragraphs": [
          "Share the current entry process, permitted work hours, restricted spaces, emergency contacts, welfare arrangements and any client rules that apply to the task. Confirm that the contractor's qualifications, insurance or other required records have been checked by the designated client or service lead.",
          "Plan deliveries, escorts, tools, noisy work and waste removal so they do not conflict with occupants or another contractor. Keep sensitive drawings and access credentials within the site's approved information controls."
        ],
        "list": [
          "Confirm the site contact and escalation route for the work period.",
          "Check induction and permit prerequisites before the visit.",
          "Coordinate work boundaries where several trades share an area."
        ]
      },
      {
        "id": "keep-permits-with-authorized-people",
        "title": "Keep permits and isolations with authorized site roles",
        "paragraphs": [
          "The site's competent and authorized people must determine applicable permit, isolation, lockout and verification requirements. A schedule or facilities work order is not a substitute for safe-work documentation, statutory duties or a technical risk assessment.",
          "Before work starts, ensure the contractor and site representative agree the boundary, communication signals and conditions that require a pause. If conditions differ from the approved plan, stop and seek review through the site's established process."
        ]
      },
      {
        "id": "close-contractor-work",
        "title": "Close the work with evidence and a named handback",
        "paragraphs": [
          "Capture the work completed, inspections or tests required by the scope, defects, temporary restrictions and any waste or access items that remain. Confirm who reviewed the evidence and who is responsible for accepting the equipment or area back into service.",
          "Carry recommendations into an owned action rather than leaving them in an attachment. Review recurring contractor issues with procurement and the service owner using evidence such as late access, incomplete closeouts or repeat defects—not general impressions alone."
        ]
      }
    ],
    "keyInsights": [
      "Define technical scope, exclusions and approval owners before attendance.",
      "Keep permits and isolation decisions with authorized site personnel.",
      "Record evidence, restrictions and accountable return-to-service decisions."
    ],
    "conclusion": "Before the next specialist visit, check whether the scope, access requirements, permit owner and handback role are clear to both the site and contractor. Resolve those basics before work begins, and make any changed conditions visible through the proper approval route.",
    "tags": ["Contractor coordination", "Permits", "Safe work"],
    "cta": {
      "title": "Coordinate specialist building maintenance",
      "body": "Review sample electrical and technical-service support with site access and closeout responsibilities defined.",
      "label": "Explore electrical maintenance",
      "href": "#/services/electrical-maintenance"
    },
    "relatedSlugs": ["vendor-management-facilities", "safety-walkthroughs", "electrical-safety-facilities-routine"]
  },
  {
    "id": "BL-116",
    "slug": "commercial-building-fabric-condition-walkaround",
    "title": "What to record on a commercial building-fabric walkaround",
    "category": "Building maintenance",
    "date": "Aug 29, 2026",
    "read": "5 min read",
    "author": "Divya Narayanan",
    "excerpt": "Turn visual observations into location-specific actions without treating a walkaround as a structural or specialist inspection.",
    "cardExcerpt": "Turn observations into practical next steps.",
    "description": "A facilities guide to recording visible building-fabric observations, prioritizing follow-up and referring technical concerns to competent specialists.",
    "image": "/assets/services/facility-maintenance.jpg",
    "imageAlt": "Representative facilities technician inspecting a commercial building service corridor during a routine walkaround.",
    "intro": "A building-fabric walkaround helps facilities teams notice visible changes early and give specialists useful context. It is an observation routine, not a substitute for a structural survey, statutory inspection or diagnosis by a competent building professional.",
    "sections": [
      {
        "id": "make-observations-location-specific",
        "title": "Make every observation easy to find again",
        "paragraphs": [
          "Record the building, floor, room or external elevation, the date and the person making the observation. Describe what can be seen in factual terms: location, apparent extent, whether the condition has changed and whether the area is in use.",
          "A useful photograph includes context and a closer view when safe and permitted. Avoid using a photograph alone to infer cause or severity, and do not enter restricted areas or work at height to collect evidence without the correct access controls."
        ],
        "list": [
          "Note damp staining, damaged finishes, door operation and visible sealant changes.",
          "Record whether access, weather or occupancy limited the observation.",
          "Attach the site reference and responsible follow-up owner."
        ]
      },
      {
        "id": "prioritize-by-consequence",
        "title": "Prioritize by consequence and uncertainty",
        "paragraphs": [
          "Consider whether the observation could affect safe access, weather protection, critical operations or occupied space. Where the consequence is unclear, identify the uncertainty instead of assigning a confident severity from a brief visual check.",
          "Use the client's escalation process for conditions that may present an immediate risk, active water ingress or a rapidly changing defect. The qualified person responsible for the building should decide whether to restrict access or arrange an urgent specialist assessment."
        ]
      },
      {
        "id": "assign-the-right-follow-up",
        "title": "Assign repair, monitoring or specialist review explicitly",
        "paragraphs": [
          "Route routine finish repairs to the appropriate trade, but refer cracks, movement, repeated ingress or suspected structural issues to a competent building professional. The facilities record can track the request and keep stakeholders informed; it should not be presented as an engineering diagnosis.",
          "If a condition is being monitored, state the interval, observation point and trigger for escalation. A vague note to keep an eye on it is difficult to audit and may leave the next team unsure what changed."
        ]
      },
      {
        "id": "close-the-condition-loop",
        "title": "Close the loop after work or assessment",
        "paragraphs": [
          "Capture the decision, work completed, supporting report and any residual risk or maintenance requirement. Link the conclusion to the original location reference so later visits can compare conditions without relying on memory.",
          "Review recurring observations with the asset owner and combine them with inspection findings, repair history and approved plans. This helps a portfolio team decide where more investigation may be warranted without inflating a visual checklist into a condition survey."
        ]
      }
    ],
    "keyInsights": [
      "Record location, visible evidence and limitations without guessing at cause.",
      "Escalate uncertain or high-consequence conditions to competent specialists.",
      "Give monitored observations a clear interval and escalation trigger."
    ],
    "conclusion": "Use the next walkaround to capture a small number of observations with precise locations, good context and named owners. The quality of follow-up matters more than the length of the checklist.",
    "tags": ["Building fabric", "Inspections", "Work orders"],
    "cta": {
      "title": "Coordinate building-fabric maintenance",
      "body": "Explore sample support for inspections, routine repairs and specialist follow-up.",
      "label": "Explore facility maintenance",
      "href": "#/services/facility-maintenance"
    },
    "relatedSlugs": ["preventive-maintenance-guide", "asset-lifecycle-plan-condition-renewal", "facility-emergency-response-playbook"]
  },
  {
    "id": "BL-115",
    "slug": "standby-generator-readiness-plan",
    "title": "A readiness plan for standby generators and backup power",
    "category": "Critical power",
    "date": "Aug 21, 2026",
    "read": "6 min read",
    "author": "Karthik Subramanian",
    "excerpt": "Keep fuel, access, test evidence and response roles visible for backup-power systems that support critical operations.",
    "cardExcerpt": "Keep backup power ready with clear roles.",
    "description": "A facilities framework for organizing standby-generator records, planned checks, specialist testing and outage communication.",
    "image": "/assets/services/generator-maintenance.jpg",
    "imageAlt": "Representative engineer checking a standby generator during a planned critical-power readiness review.",
    "intro": "A standby generator is useful only when its supporting arrangements are understood and tested in accordance with the equipment requirements and site procedures. Facilities teams can make readiness more visible by keeping records, roles, access and follow-up actions current.",
    "sections": [
      {
        "id": "map-power-dependencies",
        "title": "Map what the backup system is expected to support",
        "paragraphs": [
          "Confirm which loads are served, what transfer arrangement is installed and how the site prioritizes supply during an outage. Validate the single-line diagram and equipment references with the qualified electrical lead; do not infer circuit coverage from a generator nameplate alone.",
          "Identify any critical room, client process or life-safety system that depends on backup power. The responsible site and technical contacts should agree the operating plan, notification route and decision authority for a test or real interruption."
        ]
      },
      {
        "id": "maintain-supporting-readiness",
        "title": "Keep the supporting conditions visible",
        "paragraphs": [
          "Maintain current records for fuel arrangements, batteries, ventilation, exhaust, access, alarms and the specialists responsible for service. Record applicable storage, inspection and environmental requirements according to the equipment, manufacturer guidance and local obligations.",
          "Track overdue defects and recommendations to closure. A completed visit should show what was inspected, what evidence was captured, which exceptions remain and who decides whether the system is fit for its intended role."
        ],
        "list": [
          "Verify asset references, location and contact details.",
          "Record approved service and test dates with evidence.",
          "Escalate alarms, leaks, corrosion or access obstructions through site procedure."
        ]
      },
      {
        "id": "plan-authorized-testing",
        "title": "Plan tests with the qualified power-system team",
        "paragraphs": [
          "Agree test method, load assumptions, permit requirements, outage communications and restoration checks with competent, authorized specialists. The facilities calendar is not a substitute for the required electrical safety process or manufacturer instructions.",
          "Before testing, notify affected teams and confirm the alternate operating arrangement. After the test, document results, observed exceptions, corrective actions and the technical person's acceptance of the system state."
        ]
      },
      {
        "id": "exercise-outage-communications",
        "title": "Exercise the communication and escalation path",
        "paragraphs": [
          "Check that after-hours contacts, site security, the client representative and the service specialist can be reached using current details. Agree what information should be shared during a real outage, including affected areas, expected updates and the person authorized to make operational decisions.",
          "Review the plan after a site change, generator replacement, major service recommendation or test exception. A short tabletop review can expose stale contacts or missing roles without simulating an unsafe live outage."
        ]
      }
    ],
    "keyInsights": [
      "Confirm backup-power dependencies with the qualified electrical lead.",
      "Keep service evidence, open defects and readiness owners current.",
      "Coordinate tests and restoration through authorized site procedures."
    ],
    "conclusion": "Select one standby generator and verify that its supported loads, next approved test, unresolved recommendations and outage contact chain are easy to find. Readiness depends on the whole arrangement, not the generator alone.",
    "tags": ["Standby power", "Generator maintenance", "Business continuity"],
    "cta": {
      "title": "Keep critical-power maintenance coordinated",
      "body": "Explore sample generator support for planned checks, specialist testing and documented follow-up.",
      "label": "Explore generator maintenance",
      "href": "#/services/generator-maintenance"
    },
    "relatedSlugs": ["critical-spares-maintenance", "electrical-safety-facilities-routine", "asset-lifecycle-plan-condition-renewal"]
  },
  {
    "id": "BL-114",
    "slug": "verify-building-sustainability-projects",
    "title": "How to verify a building sustainability project after handover",
    "category": "Sustainability",
    "date": "Aug 13, 2026",
    "read": "6 min read",
    "author": "Divya Narayanan",
    "excerpt": "Use commissioning records, a clear baseline and operating ownership to check whether a sustainability upgrade works as intended.",
    "cardExcerpt": "Verify upgrades against a reliable baseline.",
    "description": "A practical handover method for facilities teams to verify sustainable building upgrades without overstating unmeasured benefits.",
    "image": "/assets/services/sustainability-services.jpg",
    "imageAlt": "Representative technician inspecting rooftop solar panels as part of a building sustainability handover.",
    "intro": "A sustainability upgrade is not complete when installation ends. Facilities teams need usable operating information, approved commissioning evidence and a plan to review performance under real conditions. The review should distinguish measured results from design estimates and identify any limits in the data.",
    "sections": [
      {
        "id": "agree-project-intent",
        "title": "Agree what the project is meant to change",
        "paragraphs": [
          "Record the intended outcome, the equipment or control boundary, assumptions used in the proposal and the party responsible for measurement. Confirm whether the goal concerns energy, water, waste, comfort, resilience or another outcome so the review does not combine unrelated indicators.",
          "Establish a baseline that reflects the relevant period, operating hours, occupancy and available meters. If the baseline is estimated or incomplete, say so plainly and agree what additional evidence would make a comparison more reliable."
        ]
      },
      {
        "id": "accept-commissioning-information",
        "title": "Accept commissioning information the site can use",
        "paragraphs": [
          "Collect equipment schedules, approved sequences, warranties, maintenance requirements, isolation information and the commissioning reports required by the contract. Check that asset identifiers and locations match the facilities register before the specialist team demobilizes.",
          "Identify outstanding defects and the person responsible for closing them. An unresolved control point, sensor calibration issue or access restriction should remain visible as an open action rather than being hidden inside a broad handover sign-off."
        ],
        "list": [
          "Confirm operating and maintenance documents are complete.",
          "Record outstanding defects and their responsible owner.",
          "Train the site team on the approved routine and escalation path."
        ]
      },
      {
        "id": "review-after-occupancy",
        "title": "Review performance after the building is operating normally",
        "paragraphs": [
          "Check the system after an agreed stabilization period and compare evidence using consistent units and boundaries. Consider weather, occupancy, operating hours and simultaneous projects before attributing a change to the upgrade.",
          "Ask occupants and operators whether the new arrangement works in practice. If comfort, reliability or service access has changed, refer the issue to the responsible design or technical specialist and record any approved adjustment."
        ]
      },
      {
        "id": "keep-sustainability-claims-evidenced",
        "title": "Keep public and internal claims proportional to evidence",
        "paragraphs": [
          "Use verified meter or commissioning evidence for quantified statements and state the period, boundary and method. Avoid presenting a modeled projection as a measured result or claiming carbon reductions without an appropriate calculation and review.",
          "Schedule a follow-up review with the asset owner, facilities lead and project specialist. A concise evidence pack helps the organization decide whether to tune, maintain, expand or reassess the intervention without promising savings that have not been demonstrated."
        ]
      }
    ],
    "keyInsights": [
      "Define the outcome and baseline before measuring a sustainability project.",
      "Handover needs usable maintenance information and closed defects.",
      "Separate measured results from estimates and design intent."
    ],
    "conclusion": "For the next building upgrade, agree who owns commissioning evidence, which meter or indicator will be reviewed and when the check will occur. Clear boundaries make both the maintenance plan and any outcome statement more credible.",
    "tags": ["Sustainability", "Commissioning", "Performance review"],
    "cta": {
      "title": "Coordinate sustainability and facility operations",
      "body": "Explore sample support for energy, maintenance and site reporting with evidence-led follow-up.",
      "label": "Explore sustainability services",
      "href": "#/services/sustainability-services"
    },
    "relatedSlugs": ["building-energy-baselines", "energy-efficiency-operating-schedules", "facility-management-data-quality"]
  },
  {
    "id": "BL-113",
    "slug": "facilities-technology-change-control",
    "title": "Introducing facilities technology without losing operational control",
    "category": "Facilities technology",
    "date": "Aug 05, 2026",
    "read": "7 min read",
    "author": "Ananya Iyer",
    "excerpt": "Use a bounded pilot, clear data ownership and an approved change process before connecting new building tools to routine work.",
    "cardExcerpt": "Pilot tools with clear data controls.",
    "description": "A facilities guide to evaluating building technology pilots, integrations, alert ownership, data access and operational support.",
    "image": "/assets/services/predictive-maintenance.jpg",
    "imageAlt": "Representative facilities engineer recording equipment-condition observations beside commercial machinery.",
    "intro": "New sensors, analytics and work-management tools can make building information easier to use, but only if people understand who owns the data and what action a signal should trigger. A small, governed pilot is often safer and more informative than a broad rollout with unclear support.",
    "sections": [
      {
        "id": "define-operational-question",
        "title": "Begin with the operational question, not the device",
        "paragraphs": [
          "Write down the decision the technology should improve: detecting an abnormal condition, planning an inspection, coordinating a service request or reporting a portfolio measure. Define the current process and its limitations so the pilot can be compared with something real.",
          "Choose a bounded asset group and a site contact who can interpret the results. Avoid collecting additional personal or operational data unless it is necessary, authorized and covered by the organization's privacy and information-security requirements."
        ]
      },
      {
        "id": "assign-data-and-alert-ownership",
        "title": "Assign data, integration and alert ownership",
        "paragraphs": [
          "Document the system of record, permitted users, retention expectations, vendor access and the process for correcting inaccurate asset details. Confirm how the solution connects to existing controls and work-order processes, and which organization remains accountable for each interface.",
          "For each alert, identify its priority, human owner, response window, backup contact and closeout record. Start with a small set of actionable signals; adding dashboards without a response process can create noise rather than better decisions."
        ],
        "list": [
          "Confirm data rights, access and support contacts before connection.",
          "Record test conditions and what counts as an actionable signal.",
          "Define rollback and escalation if the integration behaves unexpectedly."
        ]
      },
      {
        "id": "use-approved-change-control",
        "title": "Use the site's approved change-control process",
        "paragraphs": [
          "Changes to building-control sequences, alarms, network connections or safety-related systems must be reviewed and implemented by the authorized technical and information-security roles. A facilities pilot plan does not replace those approvals or qualified engineering review.",
          "Schedule a maintenance window where needed, record the before-state, verify the change and keep a rollback plan. If observed behavior differs from the approved test, stop the rollout and escalate rather than masking the signal or quietly changing thresholds."
        ]
      },
      {
        "id": "evaluate-and-scale-responsibly",
        "title": "Evaluate supportability before scaling the pilot",
        "paragraphs": [
          "Review data quality, alert usefulness, technician workload, integration reliability and support response with the people who operate the system. Capture false alarms, missed events and actions that were helpful, then decide whether the process or technology needs adjustment.",
          "Scale only when ownership, service support, security review and lifecycle costs are understood. Keep an exit path for a pilot that does not improve the target decision, and preserve useful records in the approved system so the site is not dependent on an unsupported vendor dashboard."
        ]
      }
    ],
    "keyInsights": [
      "Start from a decision that the technology should improve.",
      "Assign data, alert, integration and support responsibilities explicitly.",
      "Use approved change control and define rollback before scaling."
    ],
    "conclusion": "Before connecting a new facility tool, name the operational question, system owner, alert responder and rollback authority. A small pilot with verified outcomes can reveal whether the technology is supportable as well as whether it works.",
    "tags": ["Smart buildings", "Data governance", "Change control"],
    "cta": {
      "title": "Connect building signals to practical service",
      "body": "Explore sample smart-facility support for monitored assets, work ownership and site reporting.",
      "label": "Explore smart facilities management",
      "href": "#/services/smart-facility-management"
    },
    "relatedSlugs": ["building-automation-alert-playbook", "facility-management-data-quality", "work-order-data-that-matters"]
  },
  {
    "id": "BL-107",
    "slug": "indoor-air-quality-workplace",
    "title": "Making indoor air quality part of everyday operations",
    "category": "Indoor air quality",
    "date": "Sep 24, 2026",
    "read": "5 min read",
    "author": "Karthik Subramanian",
    "excerpt": "Combine occupant feedback, ventilation checks and measured conditions to investigate comfort concerns with context.",
    "cardExcerpt": "Check air quality with site measurements.",
    "description": "How facilities teams can pair occupant feedback with ventilation observations and measured conditions when investigating indoor air quality.",
    "image": "/assets/fm-workplace-operations.jpg",
    "imageAlt": "Facilities coordinator reviewing building systems in a modern office lobby.",
    "intro": "Indoor air quality is experienced by people, but it is influenced by building systems, occupancy, maintenance and the way a space is used. A useful response connects those signals instead of relying on a single reading or one-off complaint.",
    "sections": [
      {
        "id": "listen-to-people",
        "title": "Begin with the pattern people are describing",
        "paragraphs": [
          "Record where and when discomfort occurs, how many people are affected and whether the concern changes with occupancy or weather. Consistent notes help a team distinguish a recurring pattern from an isolated event.",
          "Treat feedback as a prompt to investigate, not as a diagnosis. Explain what will be checked and when the team will report back, especially when the cause is not immediately clear."
        ]
      },
      {
        "id": "check-ventilation",
        "title": "Check the building conditions around the concern",
        "paragraphs": [
          "Review ventilation schedules, filter condition, recent maintenance, temperature and humidity observations, and any relevant control settings. Consider room use and recent changes such as a shift in headcount or a change to partitions.",
          "Where monitoring equipment is used, confirm its location, calibration status and measurement period before comparing results. Readings are more useful when they are interpreted alongside the operating context."
        ],
        "list": [
          "Inspect air-handling and ventilation schedules.",
          "Check filters, intakes and recent service records.",
          "Compare occupied and unoccupied periods where appropriate."
        ]
      },
      {
        "id": "document-response",
        "title": "Close the loop with a clear update",
        "paragraphs": [
          "Record the observation, checks completed, any adjustment made and the point at which the result will be reviewed. Escalate specialist concerns through the site’s established health, safety and building procedures.",
          "A concise follow-up gives occupants confidence that the issue has an owner and gives the facilities team a record to compare if the concern returns."
        ]
      }
    ],
    "keyInsights": [
      "Capture location, timing and occupancy with each concern.",
      "Interpret measurements alongside system condition and operating schedules.",
      "Document the check, action and follow-up date."
    ],
    "conclusion": "Start with one recurring comfort concern. Pair occupant notes with a focused ventilation review, then agree how and when the outcome will be checked again.",
    "tags": [
      "Ventilation",
      "Occupant feedback",
      "Building comfort"
    ],
    "cta": {
      "title": "Connect comfort with system care",
      "body": "See how an HVAC maintenance scope can include planned checks, operating observations and clear follow-up.",
      "label": "Review HVAC and ventilation care",
      "href": "#/services/hvac-chiller-maintenance"
    },
    "relatedSlugs": [
      "seasonal-hvac-transition-checklist",
      "cleaning-service-programme",
      "facility-management-data-quality"
    ]
  },
  {
    "id": "BL-106",
    "slug": "building-energy-baselines",
    "title": "The building energy baseline: where to begin",
    "category": "Energy management",
    "date": "Sep 11, 2026",
    "read": "6 min read",
    "author": "Ananya Iyer",
    "excerpt": "Create a trustworthy reference point before comparing buildings, changing settings or reporting energy progress.",
    "cardExcerpt": "Set a baseline before tracking energy.",
    "description": "A facilities guide to setting a useful energy baseline by defining boundaries, accounting for operating context and checking data quality.",
    "image": "/assets/fm-plant-room.jpg",
    "imageAlt": "Facilities engineer checking equipment and readings in a commercial plant room.",
    "intro": "A baseline gives an energy team a fair point of comparison. It is not just a number from a utility bill: it depends on which meters and spaces are included, how a building is occupied and whether the underlying records are complete.",
    "sections": [
      {
        "id": "define-boundary",
        "title": "Define what the baseline includes",
        "paragraphs": [
          "List the buildings, meters and energy sources in scope, and note any areas shared with another tenant or service. Make the boundary explicit so the same load is not counted twice or quietly omitted.",
          "Keep source records and note the period covered. If a meter was replaced, a space changed use or a site was only partly occupied, record that alongside the figures rather than hiding the change."
        ]
      },
      {
        "id": "normalise-context",
        "title": "Compare like with like",
        "paragraphs": [
          "Occupancy, operating hours, weather and production patterns can all change demand. Choose a small number of contextual factors that are relevant to the property and make them visible in each review.",
          "Avoid presenting a raw month-to-month difference as proof of improvement when the period or operating conditions are not comparable. A transparent caveat is more useful than a precise-looking but misleading percentage."
        ],
        "list": [
          "Keep the reporting period consistent.",
          "Record occupancy and operating-hour changes.",
          "Separate verified readings from estimates."
        ]
      },
      {
        "id": "investigate-load",
        "title": "Use the baseline to guide a site review",
        "paragraphs": [
          "Once records are checked, look for meaningful changes by end use, time of day or building system. Then ask site teams what changed in schedules, setpoints, maintenance or demand before deciding on an action.",
          "Track the selected action and review its effect over an agreed period. This turns energy reporting into an operating conversation instead of a chart that is read once and forgotten."
        ]
      }
    ],
    "keyInsights": [
      "Write down the boundary, period and data source.",
      "Note occupancy and schedule changes before comparing usage.",
      "Pair a trend with a site check and a documented action."
    ],
    "conclusion": "Choose one building and one consistent reporting period. Confirm the meter boundary with the site team, then use the first baseline review to identify what should be checked next.",
    "tags": [
      "Energy data",
      "Building operations",
      "Performance review"
    ],
    "cta": {
      "title": "Build an operating view of energy use",
      "body": "Review a sample energy-management scope for system observations, site context and practical follow-up.",
      "label": "Explore energy management",
      "href": "#/services/energy-management"
    },
    "relatedSlugs": [
      "facility-management-data-quality",
      "work-order-data-that-matters",
      "preventive-maintenance-guide"
    ]
  },
  {
    "id": "BL-105",
    "slug": "work-order-data-that-matters",
    "title": "Five work-order signals that improve service planning",
    "category": "Work-order analytics",
    "date": "Aug 29, 2026",
    "read": "4 min read",
    "author": "Arjun Menon",
    "excerpt": "Use repeat visits, asset context and closure quality to turn work-order history into practical planning questions.",
    "cardExcerpt": "Use work history to improve planning.",
    "description": "Five practical work-order signals that help facilities teams investigate repeat faults, service delays and follow-up quality.",
    "image": "/assets/services/iot-monitoring.jpg",
    "imageAlt": "Rows of equipment in a data-centre server room, illustrating connected operational monitoring.",
    "intro": "A work-order dashboard is only as useful as the decisions it supports. A few well-defined signals—read with site context—can help a team spot recurring friction without confusing activity counts with service quality.",
    "sections": [
      {
        "id": "standardise-records",
        "title": "Make the record consistent enough to compare",
        "paragraphs": [
          "Use stable property, asset, location and fault labels so similar jobs can be found together. If technicians describe the same issue in different ways, agree a simple coding guide and update it as the service evolves.",
          "A record should also distinguish a new request from a follow-up visit. That small difference is essential when a team wants to understand whether an issue was resolved or simply returned to the queue."
        ]
      },
      {
        "id": "look-for-repeat",
        "title": "Look for repeat work and waiting time",
        "paragraphs": [
          "Repeated jobs on one asset or in one area can point to an underlying condition, a poor handoff or a scope that needs review. Compare recurrence with the work notes before drawing a conclusion.",
          "Time to first response and time to close are different measures. Use both alongside the reason a job was delayed—such as access, parts or approval—so a team can act on the constraint rather than the number alone."
        ],
        "list": [
          "Repeat callouts by asset and location.",
          "Jobs waiting on access, approval or material.",
          "Follow-up work linked to the original request."
        ]
      },
      {
        "id": "use-signals",
        "title": "Turn signals into a short review agenda",
        "paragraphs": [
          "Choose a small set of measures that has an owner and a regular review point. Ask what changed, what the notes confirm and which follow-up would reduce recurrence or improve visibility.",
          "Do not rank technicians or sites from raw counts without checking job complexity and data quality. A responsible dashboard helps teams learn where the process needs attention."
        ]
      }
    ],
    "keyInsights": [
      "Standardise asset and fault labels before comparing trends.",
      "Separate repeat work from first-time requests.",
      "Use delay reasons and completion notes to explain the metric."
    ],
    "conclusion": "Select one repeat-fault pattern and read the underlying notes with the site team. A focused review can reveal whether the next step is a repair, a schedule change or better recordkeeping.",
    "tags": [
      "Work orders",
      "Service data",
      "Operational reporting"
    ],
    "cta": {
      "title": "Make connected signals useful to the team",
      "body": "See a sample smart-facilities approach that links assets, service requests and follow-up visibility.",
      "label": "Explore smart facilities",
      "href": "#/services/smart-facility-management"
    },
    "relatedSlugs": [
      "facility-management-data-quality",
      "vendor-management-facilities",
      "preventive-maintenance-guide"
    ]
  },
  {
    "id": "BL-104",
    "slug": "safety-walkthroughs",
    "title": "A better rhythm for workplace safety walkthroughs",
    "category": "Safety walkthroughs",
    "date": "Aug 13, 2026",
    "read": "5 min read",
    "author": "Sneha Reddy",
    "excerpt": "Short, repeatable walkthroughs turn site observations into assigned actions and a clearer record of follow-through.",
    "cardExcerpt": "Turn walkthroughs into owned actions.",
    "description": "A practical approach to planning workplace safety walkthroughs, recording observations and assigning follow-up on live sites.",
    "image": "/assets/services/security-safety.jpg",
    "imageAlt": "Office access-control reader being used at a building entry.",
    "intro": "A useful safety walkthrough is specific, repeatable and connected to the site’s existing reporting process. The goal is not to create a second audit; it is to notice conditions early and make the next action clear.",
    "sections": [
      {
        "id": "plan-route",
        "title": "Choose a route that reflects site activity",
        "paragraphs": [
          "Include the areas where people, materials and building services interact: entrances, circulation routes, plant access and active work zones. The route should reflect local risk and be adjusted when the way a space is used changes.",
          "Tell the people responsible for the area when the walkthrough will happen. That gives them a chance to share context and helps avoid interrupting sensitive work unnecessarily."
        ]
      },
      {
        "id": "record-observation",
        "title": "Write observations that another person can act on",
        "paragraphs": [
          "Describe what was seen, where it was found and what made it a concern. Separate the observation from the proposed correction so a competent person can assess the appropriate control.",
          "Use the site’s required incident and hazard reporting channels for urgent or serious conditions. A routine walkthrough is not a substitute for emergency procedures or specialist assessment."
        ],
        "list": [
          "Record the location and time.",
          "Note any immediate control already applied.",
          "Identify the person or role that owns the next review."
        ]
      },
      {
        "id": "verify-action",
        "title": "Verify the action, not just the task status",
        "paragraphs": [
          "Give each follow-up a responsible owner and a review date. Where the initial action is temporary, state what evidence will confirm a durable correction.",
          "Review overdue and recurring observations with the site team. Patterns can point to a training, access, maintenance or layout issue that will not be solved by closing individual tasks."
        ]
      }
    ],
    "keyInsights": [
      "Walk a route shaped by how the site is used.",
      "Write factual, located observations with an owner.",
      "Check that controls remain effective after follow-up."
    ],
    "conclusion": "Agree one recurring walkthrough route and a straightforward method to assign and verify actions. Consistency makes it easier for people on site to participate and learn.",
    "tags": [
      "Site safety",
      "Walkthroughs",
      "Follow-up"
    ],
    "cta": {
      "title": "Coordinate safer site operations",
      "body": "Explore an illustrative security and safety coordination scope for access, escalation and site procedures.",
      "label": "Explore security and safety",
      "href": "#/services/security-safety"
    },
    "relatedSlugs": [
      "facility-emergency-response-playbook",
      "vendor-management-facilities",
      "cleaning-service-programme"
    ]
  },
  {
    "id": "BL-103",
    "slug": "vendor-management-facilities",
    "title": "Building a dependable vendor partner network",
    "category": "Service partners",
    "date": "Jul 27, 2026",
    "read": "8 min read",
    "author": "Divya Narayanan",
    "excerpt": "Clear boundaries, useful site information and regular feedback help specialist partners work as part of one service plan.",
    "cardExcerpt": "Set clear boundaries and partner feedback.",
    "description": "How to coordinate facilities vendors with clear scope boundaries, site onboarding, escalation paths and meaningful performance reviews.",
    "image": "/assets/services/integrated-facilities-management.jpg",
    "imageAlt": "Facilities manager coordinating service work inside a commercial building.",
    "intro": "Specialist providers often bring the expertise a site needs, but their work still has to fit the building’s operating rules. A dependable partner network starts with clarity about responsibilities, access and the information each team needs.",
    "sections": [
      {
        "id": "define-roles",
        "title": "Define the boundaries before work is assigned",
        "paragraphs": [
          "Document what is included, what is excluded and who approves any change to scope. Set out who raises the job, who arranges access, who owns permits and who confirms that the work is complete.",
          "For interfaces between two providers, name the handoff point. A short responsibility map can prevent important tasks from sitting between contracts."
        ]
      },
      {
        "id": "prepare-site",
        "title": "Make site onboarding practical",
        "paragraphs": [
          "Provide current access instructions, emergency contacts, local work rules and the site information a provider needs before arriving. Confirm what evidence or closeout notes are expected for the type of work.",
          "Check that required qualifications and authorisations are appropriate to the task and location. Keep approval records current and avoid assuming that a previous visit automatically covers a new activity."
        ],
        "list": [
          "Share the approved scope and site contact.",
          "Confirm access, induction and permit requirements.",
          "Agree how progress and completion will be recorded."
        ]
      },
      {
        "id": "review-partners",
        "title": "Review the relationship using evidence",
        "paragraphs": [
          "Use regular check-ins to review completed work, repeat issues, response communication and open actions. Include the people who use the site as well as the contract owner.",
          "When a service concern appears, look at the full handoff: request detail, access, parts, approval, work quality and closeout. That gives both sides a fair basis for correcting the process."
        ]
      }
    ],
    "keyInsights": [
      "Write down scope boundaries and cross-provider handoffs.",
      "Give partners current site and access information.",
      "Review outcomes and open actions with the people affected."
    ],
    "conclusion": "Map one recurring specialist service from request to close. Clear owners at each handoff will show where the partner network is dependable and where the operating agreement needs attention.",
    "tags": [
      "Vendor coordination",
      "Scope clarity",
      "Service quality"
    ],
    "cta": {
      "title": "Bring service responsibilities into one view",
      "body": "Review how an integrated facilities scope can coordinate site teams, specialist partners and reporting.",
      "label": "Explore integrated FM",
      "href": "#/services/integrated-facilities-management"
    },
    "relatedSlugs": [
      "work-order-data-that-matters",
      "facility-management-data-quality",
      "facility-emergency-response-playbook"
    ]
  },
  {
    "id": "BL-102",
    "slug": "facility-emergency-response-playbook",
    "title": "A practical emergency response playbook for facilities teams",
    "category": "Emergency readiness",
    "date": "Jul 10, 2026",
    "read": "6 min read",
    "author": "Sneha Reddy",
    "excerpt": "A named first contact, reliable site information and clear escalation roles can support a more coordinated response.",
    "cardExcerpt": "Clarify contacts and escalation roles.",
    "description": "A facilities-focused framework for first notification, escalation ownership, site information and post-incident learning.",
    "image": "/assets/services/emergency-maintenance.jpg",
    "imageAlt": "Technician working on a building air-conditioning unit during a repair visit.",
    "intro": "A building incident can change quickly. Facilities teams can support a more coordinated response when contact routes, decision roles and essential site information are agreed in advance and kept easy to find.",
    "sections": [
      {
        "id": "first-notification",
        "title": "Make the first notification straightforward",
        "paragraphs": [
          "Use the site’s established emergency process first, including public emergency services where required. The facilities contact route should help communicate location, immediate hazard information and who is already responding.",
          "Keep emergency contacts and essential system information current. A location plan, isolation reference or access instruction is only useful if it is accurate and available to the people who need it."
        ]
      },
      {
        "id": "assign-decisions",
        "title": "Clarify who coordinates each decision",
        "paragraphs": [
          "Name the incident lead, the person who communicates with building occupants and the role that can authorise access or specialist support. Make clear when an issue must be escalated to the client’s safety, security or continuity lead.",
          "Use simple status updates that distinguish confirmed facts from information still being checked. Avoid sending unverified details into broad communication channels."
        ],
        "list": [
          "Who receives the first call?",
          "Who can authorise isolation or restricted access?",
          "Who updates occupants and records decisions?"
        ]
      },
      {
        "id": "restore-review",
        "title": "Restore service carefully and learn from the event",
        "paragraphs": [
          "Before normal operation resumes, confirm that required safety checks and approvals have been completed by the right people. Record temporary controls and any remaining restrictions.",
          "After the event, review timing, communication, asset condition and the actions that remain open. Update the playbook where the experience exposed missing contacts or unclear responsibilities."
        ]
      }
    ],
    "keyInsights": [
      "Use the site’s emergency and public-response procedures.",
      "Keep decision roles, contacts and critical site facts current.",
      "Record what is confirmed, what remains open and what must be reviewed."
    ],
    "conclusion": "Test the contact and escalation chain with a short tabletop review. A practical rehearsal can reveal stale details before they are needed in a live incident.",
    "tags": [
      "Incident coordination",
      "Escalation",
      "Continuity"
    ],
    "cta": {
      "title": "Clarify urgent facilities coverage",
      "body": "Explore the sample emergency-maintenance scope and the response boundaries that should be agreed for each site.",
      "label": "Explore emergency maintenance",
      "href": "#/services/emergency-maintenance"
    },
    "relatedSlugs": [
      "safety-walkthroughs",
      "vendor-management-facilities",
      "critical-spares-maintenance"
    ]
  },
  {
    "id": "BL-101",
    "slug": "critical-spares-maintenance",
    "title": "Choosing critical spares without tying up your budget",
    "category": "Critical spares",
    "date": "Jun 22, 2026",
    "read": "5 min read",
    "author": "Karthik Subramanian",
    "excerpt": "Balance failure impact, replacement lead time and equipment commonality to focus inventory on the parts that matter.",
    "cardExcerpt": "Prioritise spares by impact and lead time.",
    "description": "A measured way to identify critical maintenance spares using consequence, supplier lead times, interchangeability and stock review.",
    "image": "/assets/services/pumps-equipment.jpg",
    "imageAlt": "Technician inspecting a pump and motor assembly in a commercial utility room.",
    "intro": "Holding every possible spare is expensive; holding none can extend an avoidable outage. A critical-spares review combines asset consequence with the time and uncertainty involved in obtaining a replacement.",
    "sections": [
      {
        "id": "identify-exposure",
        "title": "Identify the exposure a spare would reduce",
        "paragraphs": [
          "Start with equipment where downtime has a material effect on safety, continuity or essential building conditions. Check whether another unit can provide redundancy and whether a temporary operating mode is approved.",
          "Use failure history and supplier advice to identify parts that are difficult to obtain or likely to stop a repair. Treat uncertain lead times as a risk to validate, not as a fixed promise."
        ]
      },
      {
        "id": "balance-inventory",
        "title": "Balance commonality, cost and shelf life",
        "paragraphs": [
          "A part used across several assets may deserve attention because one item can support multiple repairs. Confirm the exact specification and compatibility before treating components as interchangeable.",
          "Consider purchase cost, storage conditions, degradation, warranty rules and the time required to replenish stock. For costly items, a documented supplier arrangement may be more suitable than holding a unit on site."
        ],
        "list": [
          "Failure consequence and redundancy.",
          "Verified part number and interchangeability.",
          "Lead time, storage and replenishment plan."
        ]
      },
      {
        "id": "keep-records",
        "title": "Keep ownership and review dates visible",
        "paragraphs": [
          "Record where each critical item is stored, who owns the inventory decision and what threshold triggers replenishment. Review use and supplier availability after a failure, major asset change or contract renewal.",
          "Stock policy is a living decision. A small review tied to asset criticality prevents obsolete parts from accumulating unnoticed."
        ]
      }
    ],
    "keyInsights": [
      "Prioritise spares by the consequence of waiting.",
      "Verify compatibility before grouping parts as interchangeable.",
      "Assign an owner and review the stock decision when assets or suppliers change."
    ],
    "conclusion": "Choose one critical asset and map the time from fault to replacement part. The exercise will show whether the better next step is a stocked spare, a supplier agreement or a clearer repair contingency.",
    "tags": [
      "Inventory planning",
      "Asset risk",
      "Supply lead time"
    ],
    "cta": {
      "title": "Protect continuity for critical power",
      "body": "Review a sample UPS and backup-power service scope with planned inspections and clear specialist coordination.",
      "label": "Explore UPS and power backup",
      "href": "#/services/ups-power-backup"
    },
    "relatedSlugs": [
      "preventive-maintenance-guide",
      "facility-emergency-response-playbook",
      "seasonal-hvac-transition-checklist"
    ]
  },
  {
    "id": "BL-100",
    "slug": "facility-management-data-quality",
    "title": "Why a useful facilities dashboard starts with clean data",
    "category": "Facilities data",
    "date": "Jun 04, 2026",
    "read": "7 min read",
    "author": "Ananya Iyer",
    "excerpt": "Consistent property, asset and work-order records make operational trends easier to trust and explain.",
    "cardExcerpt": "Good records make trends easier to trust.",
    "description": "Improve facilities dashboards by standardising core records, checking ownership and showing how each measure is defined.",
    "image": "/assets/facility-hero.jpg",
    "imageAlt": "Facilities engineer interacting with a building management control panel.",
    "intro": "A dashboard can make information easier to scan, but it cannot repair incomplete or inconsistent records. Reliable reporting starts with a shared understanding of buildings, assets, work statuses and the meaning of each measure.",
    "sections": [
      {
        "id": "standardise-records",
        "title": "Give buildings and assets stable identities",
        "paragraphs": [
          "Use consistent property names, asset identifiers and location conventions across the systems that feed the report. Agree how retired, replaced or relocated equipment is represented so history remains understandable.",
          "Assign data owners for the records that matter most. If no role is responsible for checking a field, it will become difficult to know whether a blank value is intentional or missing."
        ]
      },
      {
        "id": "validate-inputs",
        "title": "Check records where they are created",
        "paragraphs": [
          "Make forms and closeout steps collect only information that supports a decision. Validate required fields, use clear status definitions and give staff a way to flag a record that cannot yet be confirmed.",
          "Sample records against source documents and site observations. A small recurring quality check is more sustainable than a major cleanup after reporting has become unreliable."
        ],
        "list": [
          "Agree definitions for priority and status.",
          "Check asset IDs against current site records.",
          "Track corrections and the role that approved them."
        ]
      },
      {
        "id": "explain-metrics",
        "title": "Make the measure understandable",
        "paragraphs": [
          "Show the period, scope and calculation behind a key figure. If a work-order count excludes cancelled requests or a response-time measure begins at a particular status, make that definition available to readers.",
          "Keep a route from a summary to the records behind it. That helps managers ask better questions and gives operational teams a fair way to explain unusual results."
        ]
      }
    ],
    "keyInsights": [
      "Assign owners to core property and asset records.",
      "Validate data at entry and review a sample routinely.",
      "Publish metric definitions and the reporting scope."
    ],
    "conclusion": "Pick one dashboard measure that teams find difficult to explain. Trace it back to its source records, document the definition and agree the smallest change that would make it more reliable.",
    "tags": [
      "Data governance",
      "Asset registers",
      "Reporting"
    ],
    "cta": {
      "title": "Connect system data with service workflows",
      "body": "See how a BMS integration scope can clarify data handoffs, ownership and operational follow-up.",
      "label": "Explore BMS integration",
      "href": "#/services/bms-integration"
    },
    "relatedSlugs": [
      "work-order-data-that-matters",
      "building-energy-baselines",
      "vendor-management-facilities"
    ]
  },
  {
    "id": "BL-099",
    "slug": "cleaning-service-programme",
    "title": "Designing a cleaning programme around how spaces are used",
    "category": "Cleaning operations",
    "date": "May 18, 2026",
    "read": "4 min read",
    "author": "Janani Devi",
    "excerpt": "Use occupancy, footfall and room purpose to set practical cleaning priorities instead of applying one frequency everywhere.",
    "cardExcerpt": "Set cleaning by room use and occupancy.",
    "description": "Build a cleaning programme from space use, occupancy, service standards and observation rather than a one-size frequency chart.",
    "image": "/assets/services/cleaning-workplace-services.jpg",
    "imageAlt": "Cleaning brush and solution used on a hard floor surface.",
    "intro": "A good cleaning plan reflects the way people move through a building. Reception areas, washrooms, meeting rooms and low-use storage spaces do not experience the same demand, so a uniform schedule can miss the places that matter most.",
    "sections": [
      {
        "id": "map-use",
        "title": "Map spaces by purpose and demand",
        "paragraphs": [
          "List the main space types, their expected occupancy and the times when cleaning can happen without disrupting work. Include seasonal or event-driven changes that affect footfall.",
          "Prioritise high-touch areas and spaces with specific hygiene or client requirements using the site’s approved standards. Record those requirements clearly so local teams understand what good completion looks like."
        ]
      },
      {
        "id": "set-standards",
        "title": "Set a clear standard for each task",
        "paragraphs": [
          "Describe the expected result, the method or approved material where relevant, and how a supervisor will verify the work. Make it easy to distinguish routine care from a response to a spill or other immediate need.",
          "Confirm that staffing, equipment, storage and access are adequate for the agreed frequency. If a schedule is not practical, review the scope with the site owner rather than quietly reducing the task."
        ],
        "list": [
          "Space use and high-traffic periods.",
          "Agreed service standard and inspection method.",
          "Access, equipment and safe product handling."
        ]
      },
      {
        "id": "review-service",
        "title": "Review the service with site feedback",
        "paragraphs": [
          "Use supervisor checks, requests and occupant feedback to identify recurring gaps. Compare observations by location and time so adjustments respond to a pattern rather than a single comment.",
          "When the building changes, update the schedule and communicate the reason. A visible review cycle helps cleaning teams and building users understand what has changed."
        ]
      }
    ],
    "keyInsights": [
      "Match cleaning frequency to space use and occupancy.",
      "Define the expected outcome and how it will be checked.",
      "Review patterns and adjust when the building changes."
    ],
    "conclusion": "Walk the building with the people responsible for daily operations. A simple space-use map can reveal where a cleaning schedule needs more focus or a different service window.",
    "tags": [
      "Workplace services",
      "Space planning",
      "Quality checks"
    ],
    "cta": {
      "title": "Shape cleaning around the workplace",
      "body": "Explore a sample cleaning and workplace-services scope built around occupancy and site standards.",
      "label": "Explore cleaning services",
      "href": "#/services/cleaning-workplace-services"
    },
    "relatedSlugs": [
      "indoor-air-quality-workplace",
      "safety-walkthroughs",
      "vendor-management-facilities"
    ]
  },
  {
    "id": "BL-098",
    "slug": "seasonal-hvac-transition-checklist",
    "title": "Preparing building systems for the seasonal changeover",
    "category": "Seasonal HVAC",
    "date": "May 02, 2026",
    "read": "6 min read",
    "author": "Senthil Kumar",
    "excerpt": "Coordinate controls, plant inspections and occupant communication before weather shifts change building demand.",
    "cardExcerpt": "Prepare plant and teams for seasonal change.",
    "description": "A practical seasonal changeover checklist for HVAC schedules, plant condition, control settings, access and follow-up.",
    "image": "/assets/services/hvac-chiller-maintenance.jpg",
    "imageAlt": "HVAC engineer checking a commercial chiller and air-handling system.",
    "intro": "A change in weather can expose schedules or settings that worked well in the previous season but no longer suit the building. A coordinated review gives facilities teams time to check the plant and communicate adjustments before demand changes.",
    "sections": [
      {
        "id": "review-schedule",
        "title": "Review operating hours and control schedules",
        "paragraphs": [
          "Check holiday calendars, occupancy patterns and the start-up or shut-down times used by building controls. Compare current schedules with how spaces are actually being used and confirm who can approve a change.",
          "Where zones have different demand, avoid applying one setting across the whole property without a site review. Note the expected adjustment and when it should be checked again."
        ]
      },
      {
        "id": "inspect-equipment",
        "title": "Inspect the equipment that carries the seasonal load",
        "paragraphs": [
          "Review service records for chillers, boilers, cooling towers, pumps, filters and related controls according to the equipment and site requirements. Confirm that deferred actions are visible and assigned before peak demand.",
          "Coordinate specialist work, access and any planned isolation in advance. Record unusual readings or condition notes for review rather than making changes outside approved procedures."
        ],
        "list": [
          "Confirm the seasonal service and inspection dates.",
          "Check filters, strainers and visible equipment condition.",
          "Review alarms and control sequences with the authorised specialist."
        ]
      },
      {
        "id": "communicate-results",
        "title": "Communicate the plan and check the result",
        "paragraphs": [
          "Tell site contacts what will change, when the change takes effect and how occupants can report a comfort issue. Clear communication can reduce duplicate requests during the first days of a transition.",
          "After the changeover, review comfort feedback, energy patterns and system alarms. Use those observations to adjust the schedule or add a follow-up task for the next seasonal review."
        ]
      }
    ],
    "keyInsights": [
      "Check control schedules against actual occupancy.",
      "Plan critical plant inspections before seasonal demand rises.",
      "Review alarms and occupant feedback after the change."
    ],
    "conclusion": "Select a building with a defined seasonal peak and agree a short readiness review with the authorised site and HVAC contacts. Record what was checked and when the outcome will be revisited.",
    "tags": [
      "HVAC planning",
      "Seasonal readiness",
      "Building controls"
    ],
    "cta": {
      "title": "Plan service for your building systems",
      "body": "Review the illustrative HVAC and chiller scope for planned equipment care and seasonal coordination.",
      "label": "Plan seasonal HVAC care",
      "href": "#/services/hvac-chiller-maintenance"
    },
    "relatedSlugs": [
      "preventive-maintenance-guide",
      "building-energy-baselines",
      "indoor-air-quality-workplace"
    ]
  }
];

export const testimonials = [
  { quote: 'Northline made maintenance visible again. We have one clear view of the work, the people and what needs attention next.', name: 'Kavya Raman', role: 'VP, Workplace Operations', company: 'Meridian Workspaces', initials: 'ET' },
  { quote: 'Their team understands that in a healthcare setting, a fast response is only useful when it is coordinated and documented.', name: 'Dr. Naveen Varma', role: 'Director of Facilities', company: 'Harborview Health', initials: 'DC' },
  { quote: 'The preventive schedule has helped our site teams plan around residents instead of disrupting their day.', name: 'Priya Nair', role: 'Regional Property Director', company: 'Juniper Residential', initials: 'PN' }
];
