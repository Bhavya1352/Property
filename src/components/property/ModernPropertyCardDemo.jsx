import { ModernPropertyCard } from "./ModernPropertyCard";

const sampleProperty = {
  id: "1",
  title: "Luxury Downtown Apartment",
  location: "Manhattan, New York",
  type: "apartment",
  status: "available",
  rent: 3500,
  bedrooms: 2,
  bathrooms: 2,
  area: 1200,
  image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  description: "Beautiful modern apartment with stunning city views and premium amenities. Perfect for professionals seeking luxury living in the heart of the city.",
  createdAt: "2024-01-15"
};

const sampleProperty2 = {
  id: "2",
  title: "Cozy Family House",
  location: "Brooklyn Heights, NY",
  type: "house",
  status: "occupied",
  rent: 4200,
  bedrooms: 3,
  bathrooms: 2,
  area: 1800,
  image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  description: "Charming family home with spacious rooms and a beautiful garden. Located in a quiet neighborhood with excellent schools nearby.",
  createdAt: "2024-01-10"
};

export default function ModernPropertyCardDemo() {
  const handleDelete = (id) => {
    alert(`Delete property ${id} clicked!`);
  };

  const handleViewDetails = () => {
    alert("View details clicked!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Modern Property Card Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <ModernPropertyCard
            property={sampleProperty}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
          />
          
          <ModernPropertyCard
            property={sampleProperty2}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
          />
          
          <ModernPropertyCard
            property={{...sampleProperty, 
              id: "3",
              title: "Modern Studio",
              location: "SoHo, Manhattan",
              type: "studio",
              bedrooms: 0,
              bathrooms: 1,
              area: 600,
              rent: 2800,
              image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
            }}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>
    </div>
  );
}