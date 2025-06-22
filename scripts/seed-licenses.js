const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for admin operations
);

// Sample license data
const licenseData = [
  {
    license_id: 'ML-2025-0485',
    license_type: 'Large Scale',
    company_name: 'GoldFields Ghana Ltd.',
    company_type: 'Corporation',
    region: 'Western Region',
    district: 'Tarkwa',
    status: 'active',
    area_description: 'Tarkwa Gold Mining Concession',
    coordinates: '5.3018, -1.9934',
    area_size: '500 hectares',
    contact_name: 'John Smith',
    contact_position: 'Operations Manager',
    contact_email: 'jsmith@goldfields.com',
    contact_phone: '+233 20 111 2222',
    document_files: ['licenses/ML-2025-0485/permit.pdf', 'licenses/ML-2025-0485/eia.pdf']
  },
  {
    license_id: 'ML-2025-0484',
    license_type: 'Large Scale',
    company_name: 'Asante Gold Corporation',
    company_type: 'Corporation',
    region: 'Western North Region',
    district: 'Bibiani',
    status: 'active',
    area_description: 'Bibiani Gold Project',
    coordinates: '6.4633, -2.3208',
    area_size: '650 hectares',
    contact_name: 'Emma Johnson',
    contact_position: 'Legal Representative',
    contact_email: 'ejohnson@asantegold.com',
    contact_phone: '+233 20 333 4444',
    document_files: ['licenses/ML-2025-0484/permit.pdf']
  },
  {
    license_id: 'ML-2025-0483',
    license_type: 'Medium Scale',
    company_name: 'Adamus Resources Ltd.',
    company_type: 'Limited Liability',
    region: 'Western Region',
    district: 'Nzema',
    status: 'active',
    area_description: 'Nzema East Concession',
    coordinates: '5.0672, -2.6731',
    area_size: '320 hectares',
    contact_name: 'Daniel Kwaku',
    contact_position: 'CEO',
    contact_email: 'daniel@adamus.com',
    contact_phone: '+233 20 555 6666',
    document_files: ['licenses/ML-2025-0483/permit.pdf', 'licenses/ML-2025-0483/map.pdf']
  },
  {
    license_id: 'ML-2025-0482',
    license_type: 'Small Scale',
    company_name: 'Obuasi Minerals Ltd.',
    company_type: 'Limited Liability',
    region: 'Ashanti Region',
    district: 'Obuasi',
    status: 'pending',
    area_description: 'Eastern Obuasi Zone',
    coordinates: '6.2017, -1.6682',
    area_size: '25 hectares',
    contact_name: 'Akwasi Mensah',
    contact_position: 'Owner',
    contact_email: 'akwasi@obuasiminerals.com',
    contact_phone: '+233 20 777 8888',
    document_files: []
  },
  {
    license_id: 'ML-2024-0481',
    license_type: 'Small Scale',
    company_name: 'Prestea Mining Cooperative',
    company_type: 'Cooperative',
    region: 'Western Region',
    district: 'Prestea',
    status: 'active',
    area_description: 'Prestea South Concession',
    coordinates: '5.4338, -2.1441',
    area_size: '18 hectares',
    contact_name: 'Kofi Adu',
    contact_position: 'Cooperative President',
    contact_email: 'kofi@presteamining.org',
    contact_phone: '+233 24 999 0000',
    document_files: ['licenses/ML-2024-0481/permit.pdf']
  },
  {
    license_id: 'ML-2024-0480',
    license_type: 'Small Scale',
    company_name: 'Dunkwa Gold Ventures',
    company_type: 'Partnership',
    region: 'Central Region',
    district: 'Dunkwa',
    status: 'active',
    area_description: 'Dunkwa Riverside Concession',
    coordinates: '5.9598, -1.7801',
    area_size: '12 hectares',
    contact_name: 'Abena Yeboah',
    contact_position: 'Managing Partner',
    contact_email: 'abena@dunkwagold.com',
    contact_phone: '+233 24 111 2222',
    document_files: ['licenses/ML-2024-0480/permit.pdf', 'licenses/ML-2024-0480/eia.pdf']
  },
  {
    license_id: 'ML-2024-0479',
    license_type: 'Medium Scale',
    company_name: 'Eastern Minerals Ltd.',
    company_type: 'Limited Liability',
    region: 'Eastern Region',
    district: 'Kibi',
    status: 'revoked',
    area_description: 'Kibi Forest Zone',
    coordinates: '6.1647, -0.5550',
    area_size: '200 hectares',
    contact_name: 'James Appiah',
    contact_position: 'Director',
    contact_email: 'james@easternminerals.com',
    contact_phone: '+233 24 333 4444',
    document_files: ['licenses/ML-2024-0479/permit.pdf']
  },
  {
    license_id: 'ML-2024-0478',
    license_type: 'Small Scale',
    company_name: 'Akyem Mining Company',
    company_type: 'Sole Proprietorship',
    region: 'Eastern Region',
    district: 'Akyem',
    status: 'expired',
    area_description: 'Akyem North Concession',
    coordinates: '6.3510, -0.9816',
    area_size: '10 hectares',
    contact_name: 'Kwame Boateng',
    contact_position: 'Owner',
    contact_email: 'kwame@akyemmining.com',
    contact_phone: '+233 24 555 6666',
    document_files: ['licenses/ML-2024-0478/permit.pdf']
  }
];

// Function to insert data
async function seedLicenseData() {
  try {
    console.log('Starting license data seeding...');
    
    // Clear existing data first (optional)
    const { error: deleteError } = await supabase
      .from('mining_licenses')
      .delete()
      .not('id', 'is', null); // Safety condition to make sure we don't accidentally delete everything
      
    if (deleteError) {
      console.error('Error clearing existing data:', deleteError);
      return;
    }
    
    console.log('Existing data cleared successfully');
    
    // Insert new license data
    const { data, error } = await supabase
      .from('mining_licenses')
      .insert(licenseData);
      
    if (error) {
      console.error('Error inserting license data:', error);
      return;
    }
    
    console.log('License data inserted successfully');
    
  } catch (error) {
    console.error('Error in seedLicenseData function:', error);
  }
}

// Execute the seeding function
seedLicenseData()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('Seeding failed:', error);
    process.exit(1);
  }); 