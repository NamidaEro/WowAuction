'use client'
import { useState } from 'react';

// interface Auction {
//   id: number;
//   item: { id: number };
//   bid: number;
//   buyout: number;
//   quantity: number;
//   itemDetails?: Item | null; // 수정: Item | undefined | null
// }

// interface Item {
//   id: number;
//   name: string;
//   quality: { name: string };
//   level: number;
// }

// interface AuctionsResponse {
//   auctions: Auction[];
// }

// const HomePage: React.FC = () => {
//   // Connected Realm 리스트
//   const realms = [
//     { id: 205, name: '아즈샤라' },
//     { id: 210, name: '듀로탄' },
//     { id: 214, name: '윈드러너' },
//     { id: 2116, name: '줄진' }
//   ];

//   const [data, setData] = useState<Auction[] | null>(null); // 업데이트: Auction[]만 저장
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   // 경매 데이터를 가져오는 함수
//   const fetchAuctions = async (connectedRealmId: number) => {
//     setLoading(true);
//     setError(null); // 오류 초기화
//     setData(null); // 기존 데이터 초기화
//     try {
//       const response = await fetch(`/api/auctions/${connectedRealmId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch auctions');
//       }
//       const result: AuctionsResponse = await response.json();

//       // 각 Auction의 itemId로 Item 정보를 가져오기
//       const auctionsWithItemDetails = await Promise.all(
//         result.auctions.map(async (auction) => {
//           const itemDetails = await fetchItem(auction.item.id); // Item 정보 가져오기
//           return { ...auction, itemDetails }; // Auction에 Item 정보 추가
//         })
//       );

//       setData(auctionsWithItemDetails);
//     } catch (error) {
//       setError('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 개별 Item 정보를 가져오는 함수
//   const fetchItem = async (itemId: number): Promise<Item | null> => {
//     try {
//       const response = await fetch(`/api/item/${itemId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch item');
//       }
//       const item: Item = await response.json();
//       return item;
//     } catch (error) {
//       console.error(`Failed to fetch item with ID ${itemId}`, error);
//       return null;
//     }
//   };

//   return (
//     <div>
//       <h1>Connected Realm Auctions</h1>
//       <h2>Select a Realm</h2>
//       <ul>
//         {realms.map((realm) => (
//           <li key={realm.id}>
//             <button onClick={() => fetchAuctions(realm.id)}>
//               {realm.name} (ID: {realm.id})
//             </button>
//           </li>
//         ))}
//       </ul>

//       {loading && <p>Loading auctions...</p>}
//       {error && <p>{error}</p>}
//       {data ? (
//         <ul>
//           {data.map((auction) => (
//             <li key={auction.id}>
//               <strong>Auction ID: {auction.id}</strong> <br />
//               Item ID: {auction.item.id} <br />
//               {auction.itemDetails ? (
//                 <>
//                   Item Name: {auction.itemDetails.name} <br />
//                   Item Quality: {auction.itemDetails.quality.name} <br />
//                   Item Level: {auction.itemDetails.level} <br />
//                 </>
//               ) : (
//                 <p>Loading item details...</p>
//               )}
//               Bid: {auction.bid} <br />
//               Buyout: {auction.buyout} <br />
//               Quantity: {auction.quantity}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No auction data available. Select a realm to see the auctions.</p>
//       )}
//     </div>
//   );
// };

// export default HomePage;


// app/page.tsx
// import { useState } from 'react';

// interface Item {
//   id: number;
//   name: string;
//   quality: { name: string };
//   level: number;
// }

// const HomePage: React.FC = () => {
//   const [itemId, setItemId] = useState<string>(''); // 아이템 ID
//   const [data, setData] = useState<Item | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const fetchItem = async () => {
//     setLoading(true);
//     setError(null);
//     setData(null);

//     if (!itemId) {
//       setError('Please provide an itemId');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(`/api/item/${itemId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch item');
//       }
//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       setError('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Item Information</h1>
//       <input
//         type="text"
//         value={itemId}
//         onChange={(e) => setItemId(e.target.value)}
//         placeholder="Enter Item ID"
//       />
//       <button onClick={fetchItem}>Fetch Item</button>

//       {loading && <p>Loading item data...</p>}
//       {error && <p>{error}</p>}
//       {data ? (
//         <div>
//           <h2>Item Details</h2>
//           <p>ID: {data.id}</p>
//           <p>Name: {data.name}</p>
//           <p>Quality: {data.quality.name}</p>
//           <p>Item Level: {data.level}</p>
//         </div>
//       ) : (
//         <p>No item data available. Enter an item ID to see the details.</p>
//       )}
//     </div>
//   );
// };

interface Item {
  id: number;
  name: string;
  quality: { name: string };
  level: number;
}

interface Auction {
  id: number;
  item: { id: number };
  bid: number;
  buyout: number;
  quantity: number;
  itemDetails?: Item | null; // 수정: Item | undefined | null
}

interface AuctionsResponse {
  auctions: Auction[];
}

const HomePage: React.FC = () => {
  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/commodities`);
      if (!response.ok) {
        throw new Error('Failed to fetch item');
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
    } finally {
    }
  };

  //   // 경매 데이터를 가져오는 함수
  const fetchAuctions = async (connectedRealmId: number) => {
    try {
      const response = await fetch(`/api/auctions/${connectedRealmId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch auctions');
      }
      const result: AuctionsResponse = await response.json();
      console.log(result);
    } catch (error) {
    } finally {
    }
  };

  fetchAuctions(205);
  fetchItem();
  return (
    <div>
    </div>
  );
}

export default HomePage;
