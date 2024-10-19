'use client'

// import { useEffect, useState } from 'react';

// interface Achievement {
//   id: number;
//   name: string;
// }

// interface AchievementsIndexResponse {
//   achievements: Achievement[];
// }

// const HomePage: React.FC = () => {
//   const [data, setData] = useState<AchievementsIndexResponse | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAchievements = async () => {
//       try {
//         const response = await fetch('/api/achievements');
//         if (!response.ok) {
//           throw new Error('Failed to fetch achievements');
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError('Failed to load data');
//       }
//     };

//     fetchAchievements();
//   }, []);

//   return (
//     <div>
//       <h1>WoW Achievements</h1>
//       {error && <p>{error}</p>}
//       {data ? (
//         <ul>
//           {data.achievements.map((achievement) => (
//             <li key={achievement.id}>
//               {achievement.id}: {achievement.name}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default HomePage;

// app/page.tsx
// app/page.tsx
// app/page.tsx
import { useState } from 'react';

interface Auction {
  id: number;
  item: { id: number };
  bid: number;
  buyout: number;
  quantity: number;
}

interface AuctionsResponse {
  auctions: Auction[];
}

const HomePage: React.FC = () => {
  // Connected Realm 리스트
  const realms = [
    { id: 205, name: '아즈샤라' },
    { id: 210, name: '듀로탄' },
    { id: 214, name: '윈드러너' },
    { id: 2116, name: '줄진' }
  ];

  const [data, setData] = useState<AuctionsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAuctions = async (connectedRealmId: number) => {
    setLoading(true);
    setError(null); // 오류 초기화
    setData(null); // 기존 데이터 초기화
    try {
      const response = await fetch(`/api/auctions/${connectedRealmId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch auctions');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Connected Realm Auctions</h1>
      <h2>Select a Realm</h2>
      <ul>
        {realms.map((realm) => (
          <li key={realm.id}>
            <button onClick={() => fetchAuctions(realm.id)}>
              {realm.name} (ID: {realm.id})
            </button>
          </li>
        ))}
      </ul>

      {loading && <p>Loading auctions...</p>}
      {error && <p>{error}</p>}
      {data ? (
        <ul>
          {data.auctions.map((auction) => (
            <li key={auction.id}>
              Auction ID: {auction.id}, Item ID: {auction.item.id}, Bid: {auction.bid}, Buyout: {auction.buyout}, Quantity: {auction.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No auction data available. Select a realm to see the auctions.</p>
      )}
    </div>
  );
};

export default HomePage;
