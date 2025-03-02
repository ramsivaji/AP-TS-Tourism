import React, { useState } from 'react';
import { MapPin, Calendar, Clock, IndianRupee, Info, Navigation, Compass, Utensils, Mountain, Landmark, Waves, Camera } from 'lucide-react';
import './App.css';

// Types
type State = 'telangana' | 'andhra';
type Category = 'all' | 'historical' | 'nature' | 'food' | 'adventure';

interface TouristPlace {
  id: string;
  name: string;
  description: string;
  image: string;
  categories: Category[];
  bestTime: string;
  entryFee: string;
  location: string;
  mapLink: string;
  tips: string[];
}

// Data
const touristPlaces: Record<State, TouristPlace[]> = {
  telangana: [
    {
      id: 'charminar',
      name: 'Charminar',
      description: 'Built in 1591 by Muhammad Quli Qutb Shah, Charminar is a monument and mosque located in Hyderabad. The landmark has become a global icon of Hyderabad, listed among the most recognized structures in India.',
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/charminar-mosque-hyderabad-telangana-3-attr-about?qlt=82&ts=1726652899615',
      categories: ['historical', 'all'],
      bestTime: 'October to March',
      entryFee: '₹25 for Indians, ₹300 for foreigners',
      location: 'Hyderabad',
      mapLink: 'https://maps.app.goo.gl/nbptVettGGhKq9mA8',
      tips: ['Visit early morning to avoid crowds', 'Explore nearby Laad Bazaar for shopping', 'Try the famous Irani chai nearby']
    },
    {
      id: 'golconda',
      name: 'Golconda Fort',
      description: 'Golconda Fort was the capital of the medieval sultanate of the Qutb Shahi dynasty. The fort is known for its acoustic effects, palaces, ingenious water supply system, and the famous Fateh Rahben gun.',
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/golconda-fort-hyderabad-secunderabad-telangana-3-musthead-hero?qlt=82&ts=1726652909392',
      categories: ['historical', 'all'],
      bestTime: 'November to February',
      entryFee: '₹20 for Indians, ₹200 for foreigners',
      location: 'Hyderabad',
      mapLink: 'https://maps.app.goo.gl/qbR3ex4XLtp2MyXi8',
      tips: ['Attend the sound and light show in the evening', 'Wear comfortable shoes as there is a lot of walking', 'Carry water bottles']
    },
    {
      id: 'ramoji',
      name: 'Ramoji Film City',
      description: 'Certified by the Guinness World Records as the world\'s largest film studio complex, Ramoji Film City spreads over 1,666 acres. It offers tours, attractions, and a glimpse into the world of filmmaking.',
      image: 'https://hyderabadtourpackage.in/images/places-to-visit/ramoji-film-city-hyderabad-entryfee-timings-tour-package-header.jpg',
      categories: ['adventure', 'all'],
      bestTime: 'September to March',
      entryFee: '₹1,250 onwards',
      location: 'Hyderabad',
      mapLink: 'https://maps.app.goo.gl/pzNY3UjLKj5cciVe9',
      tips: ['Book tickets online to avoid queues', 'Plan a full day visit', 'Take the guided tour for the best experience']
    },
    {
      id: 'hussainsagar',
      name: 'Hussain Sagar Lake',
      description: 'Built in 1563, Hussain Sagar is a heart-shaped lake that separates Hyderabad and Secunderabad. The monolithic statue of Lord Buddha stands on Gibraltar Rock in the middle of the lake.',
      image: 'https://alike-asset-uae.s3.me-central-1.amazonaws.com/catalog/product/h/y/hyderabad_tour_with_hussain_sagar_lake_book_tickets_1_.jpg?store=alike&image-type=image',
      categories: ['nature', 'all'],
      bestTime: 'October to March',
      entryFee: 'Free (Boat ride to Buddha statue: ₹50)',
      location: 'Hyderabad',
      mapLink: 'https://maps.app.goo.gl/LHhmbmdpTSVZhMce7',
      tips: ['Visit during sunset for beautiful views', 'Try the boating experience', 'Explore Lumbini Park nearby']
    },
    {
      id: 'warangal',
      name: 'Warangal Fort',
      description: 'Warangal Fort was built in the 13th century by the Kakatiya dynasty. The fort is known for its ornate gates, sculptures, and stone gateways (Kakatiya Kala Thoranam), which is also the emblem of Telangana.',
      image: 'https://im.hunt.in/cg/warangal/City-Guide/Warangal_fort_pillars.jpg',
      categories: ['historical', 'all'],
      bestTime: 'October to March',
      entryFee: '₹15 for Indians, ₹200 for foreigners',
      location: 'Warangal',
      mapLink: 'https://maps.app.goo.gl/xyeX79BkaKeCMWd6A',
      tips: ['Visit early morning for photography', 'Combine with a visit to Thousand Pillar Temple', 'Hire a local guide to understand the history']
    },
    {
      id: 'ananthagiri',
      name: 'Ananthagiri Hills',
      description: 'Located in Vikarabad, Ananthagiri Hills is one of the densest forests in Telangana. It is the birthplace of Musi River and home to the ancient Anantha Padmanabha Swamy Temple.',
      image: 'https://clubmahindra.gumlet.io/blog/media/section_images/discoveran-92a6f3b7f440d40.jpg?w=376&dpr=2.6',
      categories: ['nature', 'adventure', 'all'],
      bestTime: 'July to February',
      entryFee: 'Free',
      location: 'Vikarabad',
      mapLink: 'https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E11',
      tips: ['Great for trekking and camping', 'Visit the ancient temple', 'Carry food and water as options are limited']
    },
    {
      id: 'biryani',
      name: 'Hyderabadi Biryani Trail',
      description: 'Hyderabadi biryani is a renowned dish of India that originated in the kitchens of the Nizam of Hyderabad. This culinary trail takes you through the best biryani joints in the city.',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      categories: ['food', 'all'],
      bestTime: 'Any time of year',
      entryFee: 'Varies by restaurant',
      location: 'Hyderabad',
      mapLink: 'https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E12',
      tips: ['Paradise, Bawarchi, and Shadab are must-visit places', 'Try both chicken and mutton variants', 'Combine with Irani chai and Osmania biscuits']
    }
  ],
  andhra: [
    {
      id: 'tirupati',
      name: 'Tirupati Balaji Temple',
      description: 'Sri Venkateswara Temple is a Hindu temple situated in the hill town of Tirumala at Tirupati. The Temple is dedicated to Lord Venkateswara, an incarnation of Vishnu, who is believed to have appeared here to save mankind from trials and troubles of Kali Yuga.',
      image: 'https://wallpaperaccess.com/full/3479478.jpg',
      categories: ['historical', 'all'],
      bestTime: 'September to March',
      entryFee: 'Free (Special darshan tickets available)',
      location: 'Tirupati',
      mapLink: 'https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E13',
      tips: ['Book darshan tickets online in advance', 'Be prepared for long queues', 'Dress conservatively as per temple norms']
    },
    {
      id: 'araku',
      name: 'Araku Valley',
      description: 'Araku Valley is a hill station in Andhra Pradesh, famous for its breathtaking landscapes, waterfalls, and coffee plantations. The valley is home to various tribal communities and offers a unique cultural experience.',
      image: 'https://www.india.com/wp-content/uploads/2024/05/Ananthagiri-Hills-1.jpg',
      categories: ['nature', 'adventure', 'all'],
      bestTime: 'October to March',
      entryFee: 'Free (Attractions within may have fees)',
      location: 'Visakhapatnam District',
      mapLink: 'https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E14',
      tips: ['Take the scenic train journey from Vizag', 'Visit the coffee museum', 'Explore Borra Caves nearby']
    },
    {
      id: 'vizag',
      name: 'Visakhapatnam Beaches',
      description: 'Visakhapatnam (Vizag) is known for its pristine beaches along the Bay of Bengal. RK Beach, Rushikonda Beach, and Yarada Beach are some of the most popular ones offering beautiful views and water activities.',
      image: 'https://english.cdn.zeenews.com/sites/default/files/2020/10/13/892434-vizag-beach.gif',
      categories: ['nature', 'adventure', 'all'],
      bestTime: 'October to March',
      entryFee: 'Free',
      location: 'Visakhapatnam',
      mapLink: 'https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E15',
      tips: ['Visit during sunrise or sunset for best views', 'Try water sports at Rushikonda Beach', 'Visit the submarine museum near RK Beach']
    },
    {
      id: 'lepakshi',
      name: 'Lepakshi Temple',
      description: 'Lepakshi is a historic village known for the 16th-century Veerabhadra Temple built in the Vijayanagara architectural style. The temple is famous for its hanging pillar, large Nandi bull sculpture, and exquisite mural paintings.',
      image: 'https://s7ap1.scene7.com/is/image/incredibleindia/lepakshi-anantapur-ap-2-attr-hero?qlt=82&ts=1726743907673',
      categories: ['historical', 'all'],
      bestTime: 'October to March',
      entryFee: '₹5',
      location: 'Anantapur District',
      mapLink: 'https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E16',
      tips: ['Hire a guide to understand the historical significance', 'Visit early morning for photography', 'Combine with a trip to Bangalore or Puttaparthi']
    },
    {
      id: 'papikondalu',
      name: 'Papikondalu',
      description: 'Papikondalu is a series of mountain ranges that run along the River Godavari. The boat journey through the hills and the river offers breathtaking views and a serene experience.',
      image: 'https://telanganaboattourism.com/assets/images/papikondalu-900x500.jpg',
      categories: ['nature', 'adventure', 'all'],
      bestTime: 'October to March',
      entryFee: 'Boat ride: ₹1,000 onwards',
      location: 'East Godavari District',
      mapLink: 'https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E17',
      tips: ['Book boat rides in advance', 'Carry essentials as facilities are limited', 'Overnight packages are available']
    },
    {
      id: 'amaravati',
      name: 'Amaravati',
      description: 'Amaravati is an ancient city that served as the capital of the Satavahana dynasty. It is known for its Buddhist stupa, ancient artifacts, and the Amaralingeswara Temple.',
      image: 'https://tripxl.com/blog/wp-content/uploads/2024/08/Amaravati-840x425.jpg',
      categories: ['historical', 'all'],
      bestTime: 'October to March',
      entryFee: '₹5 for Archaeological Museum',
      location: 'Guntur District',
      mapLink: 'https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E18',
      tips: ['Visit the archaeological museum', 'Explore the ancient Buddhist sites', 'Combine with a visit to Vijayawada']
    },
    {
      id: 'cuisine',
      name: 'Andhra Cuisine Trail',
      description: 'Andhra Pradesh is famous for its spicy and flavorful cuisine. This culinary trail takes you through the best places to experience authentic Andhra food, from spicy curries to delicious desserts.',
      image: 'https://www.hlimg.com/images/stories/738X538/cover-pic_1527239659m.jpg',
      categories: ['food', 'all'],
      bestTime: 'Any time of year',
      entryFee: 'Varies by restaurant',
      location: 'Various cities',
      mapLink: 'https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E19',
      tips: ['Try Gongura dishes, Pulihora, and Andhra-style biryani', 'Be prepared for spicy food', 'Don\'t miss the traditional sweets like Pootharekulu']
    }
  ]
};

// Sample itineraries
const sampleItineraries: Record<State, { title: string; days: { day: number; places: string[] }[] }[]> = {
  telangana: [
    {
      title: '3-Day Hyderabad City Tour',
      days: [
        { day: 1, places: ['charminar', 'golconda'] },
        { day: 2, places: ['ramoji'] },
        { day: 3, places: ['hussainsagar', 'biryani'] }
      ]
    },
    {
      title: '5-Day Telangana Explorer',
      days: [
        { day: 1, places: ['charminar', 'golconda'] },
        { day: 2, places: ['hussainsagar'] },
        { day: 3, places: ['ramoji'] },
        { day: 4, places: ['warangal'] },
        { day: 5, places: ['ananthagiri'] }
      ]
    }
  ],
  andhra: [
    {
      title: '3-Day Spiritual & Nature Tour',
      days: [
        { day: 1, places: ['tirupati'] },
        { day: 2, places: ['amaravati'] },
        { day: 3, places: ['lepakshi'] }
      ]
    },
    {
      title: '5-Day Andhra Complete Experience',
      days: [
        { day: 1, places: ['tirupati'] },
        { day: 2, places: ['vizag'] },
        { day: 3, places: ['araku'] },
        { day: 4, places: ['papikondalu'] },
        { day: 5, places: ['cuisine'] }
      ]
    }
  ]
};

function App() {
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [showItineraries, setShowItineraries] = useState(false);

  const filteredPlaces = selectedState
    ? touristPlaces[selectedState].filter(place => 
        selectedCategory === 'all' || place.categories.includes(selectedCategory)
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Compass className="h-8 w-8 mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold">RAMA AP & TS EXPLORE</h1>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => {
                setSelectedState('telangana');
                setShowItineraries(false);
              }}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedState === 'telangana' 
                  ? 'bg-white text-blue-700 font-semibold' 
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              Telangana
            </button>
            <button 
              onClick={() => {
                setSelectedState('andhra');
                setShowItineraries(false);
              }}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedState === 'andhra' 
                  ? 'bg-white text-blue-700 font-semibold' 
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}
            >
              Andhra Pradesh
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {selectedState ? (
          <>
            {/* State Introduction */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {selectedState === 'telangana' ? 'Explore Telangana' : 'Discover Andhra Pradesh'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {selectedState === 'telangana' 
                  ? 'Telangana, the youngest state of India, is a treasure trove of history, culture, and natural beauty. From the historic charm of Hyderabad to the serene hills of Ananthagiri, explore the diverse attractions of this vibrant state.'
                  : 'Andhra Pradesh, known as the "Rice Bowl of India," offers a perfect blend of spirituality, natural beauty, and rich cultural heritage. From divine temples to pristine beaches, experience the diverse attractions of this coastal state.'}
              </p>
            </div>

            {/* Toggle between Places and Itineraries */}
            <div className="flex justify-center mb-8">
              <button 
                onClick={() => setShowItineraries(false)}
                className={`px-6 py-2 rounded-l-lg transition-all ${
                  !showItineraries 
                    ? 'bg-blue-600 text-white font-semibold' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Tourist Places
              </button>
              <button 
                onClick={() => setShowItineraries(true)}
                className={`px-6 py-2 rounded-r-lg transition-all ${
                  showItineraries 
                    ? 'bg-blue-600 text-white font-semibold' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Suggested Itineraries
              </button>
            </div>

            {!showItineraries ? (
              <>
                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <CategoryButton 
                    category="all" 
                    label="All Places" 
                    icon={<Compass className="h-4 w-4 mr-1" />}
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                  />
                  <CategoryButton 
                    category="historical" 
                    label="Historical" 
                    icon={<Landmark className="h-4 w-4 mr-1" />}
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                  />
                  <CategoryButton 
                    category="nature" 
                    label="Nature" 
                    icon={<Mountain className="h-4 w-4 mr-1" />}
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                  />
                  <CategoryButton 
                    category="food" 
                    label="Food" 
                    icon={<Utensils className="h-4 w-4 mr-1" />}
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                  />
                  <CategoryButton 
                    category="adventure" 
                    label="Adventure" 
                    icon={<Waves className="h-4 w-4 mr-1" />}
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                  />
                </div>

                {/* Places Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPlaces.map(place => (
                    <PlaceCard key={place.id} place={place} />
                  ))}
                </div>
              </>
            ) : (
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Recommended Itineraries</h3>
                {sampleItineraries[selectedState].map((itinerary, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="bg-blue-600 text-white p-4">
                      <h4 className="text-xl font-semibold">{itinerary.title}</h4>
                    </div>
                    <div className="p-6">
                      {itinerary.days.map(day => (
                        <div key={day.day} className="mb-6 last:mb-0">
                          <h5 className="text-lg font-semibold mb-3 text-blue-700">Day {day.day}</h5>
                          <div className="space-y-4">
                            {day.places.map(placeId => {
                              const place = touristPlaces[selectedState].find(p => p.id === placeId);
                              return place ? (
                                <div key={placeId} className="flex items-start">
                                  <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 mr-4">
                                    <img 
                                      src={place.image} 
                                      alt={place.name} 
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h6 className="font-medium text-gray-800">{place.name}</h6>
                                    <p className="text-sm text-gray-600 line-clamp-2">{place.description.substring(0, 100)}...</p>
                                  </div>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      ))}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 italic">
                          This itinerary is designed for efficient travel between locations. Customize it based on your preferences and available time.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center max-w-2xl">
              <Compass className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to RAMA AP & TS EXPLORE</h2>
              <p className="text-xl text-gray-600 mb-8">
                Discover the rich cultural heritage, breathtaking landscapes, and culinary delights of Telangana and Andhra Pradesh.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  onClick={() => setSelectedState('telangana')}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                >
                  <div className="h-48 bg-blue-600 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Telangana</h3>
                    <p className="text-gray-600">
                      Discover historic Hyderabad, ancient forts, and natural wonders
                    </p>
                  </div>
                </div>
                <div 
                  onClick={() => setSelectedState('andhra')}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                >
                  <div className="h-48 bg-indigo-600 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Andhra Pradesh</h3>
                    <p className="text-gray-600">
                      Experience divine temples, pristine beaches, and spicy cuisine
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Compass className="h-6 w-6 mr-2" />
                <span className="text-xl font-bold">RAMA AP & TS EXPLORE</span>
              </div>
              <p className="text-gray-400 mt-2">Your guide to Telangana & Andhra Pradesh</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <p className="text-gray-400">© 2025 RAMA SIVAJI KAISARLLA</p>
              <p className="text-gray-400 mt-1">All information is for educational purposes</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Components
interface CategoryButtonProps {
  category: Category;
  label: string;
  icon: React.ReactNode;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

function CategoryButton({ category, label, icon, selectedCategory, setSelectedCategory }: CategoryButtonProps) {
  return (
    <button 
      onClick={() => setSelectedCategory(category)}
      className={`flex items-center px-4 py-2 rounded-full transition-all ${
        selectedCategory === category 
          ? 'bg-blue-600 text-white font-semibold' 
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

interface PlaceCardProps {
  place: TouristPlace;
}

function PlaceCard({ place }: PlaceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:shadow-xl">
      <div className="h-48 overflow-hidden">
        <img 
          src={place.image} 
          alt={place.name} 
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{place.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{place.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-blue-600" />
            <span>{place.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
            <span>Best time: {place.bestTime}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <IndianRupee className="h-4 w-4 mr-2 text-blue-600" />
            <span>Entry fee: {place.entryFee}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <Info className="h-4 w-4 mr-1 text-blue-600" />
            Travel Tips
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {place.tips.slice(0, 2).map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 flex justify-between">
          <a 
            href={place.mapLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Navigation className="h-4 w-4 mr-1" />
            <span>View on Map</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;