import React, { useState } from "react";

type Tab =
  | "Overview"
  | "Rooms"
  | "Mess"
  | "Hostel Details"
  | "Gallery"
  | "Wardens"
  | "Rules & Notices";

type RoomData = {
  hostel: string;
  totalRooms: number;
  occupiedRooms: number;
  capacity: number;
  roomTypes: { name: string; count: number }[];
};

type MenuItem = {
  id: number;
  day: string;
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
};

type Notice = {
  id: number;
  title: string;
  description: string;
  date: string;
  type: "Rule" | "Announcement";
};

const initialRooms: RoomData[] = [
  {
    hostel: "Boys Hostel",
    totalRooms: 120,
    occupiedRooms: 95,
    capacity: 240,
    roomTypes: [
      { name: "Single Sharing", count: 20 },
      { name: "Double Sharing", count: 70 },
      { name: "Triple Sharing", count: 30 },
    ],
  },
  {
    hostel: "Girls Hostel",
    totalRooms: 100,
    occupiedRooms: 82,
    capacity: 200,
    roomTypes: [
      { name: "Single Sharing", count: 15 },
      { name: "Double Sharing", count: 65 },
      { name: "Triple Sharing", count: 20 },
    ],
  },
];

const initialMenu: MenuItem[] = [
  {
    id: 1,
    day: "Monday",
    breakfast: "Idly, Sambar, Chutney",
    lunch: "Rice, Sambar, Poriyal",
    snacks: "Tea and Biscuits",
    dinner: "Chapati, Kurma",
  },
  {
    id: 2,
    day: "Tuesday",
    breakfast: "Pongal, Chutney",
    lunch: "Rice, Rasam, Vegetables",
    snacks: "Sundal and Tea",
    dinner: "Dosa, Sambar",
  },
  {
    id: 3,
    day: "Wednesday",
    breakfast: "Dosa, Sambar",
    lunch: "Rice, Meals, Curd",
    snacks: "Tea and Banana",
    dinner: "Rice, Chapati, Curry",
  },
];

const initialNotices: Notice[] = [
  {
    id: 1,
    title: "Hostel Entry Timing",
    description: "Students should return to the hostel before the prescribed entry time.",
    date: "2026-11-14",
    type: "Rule",
  },
  {
    id: 2,
    title: "Hostel Maintenance",
    description: "Students are requested to report room maintenance issues to the warden.",
    date: "2026-11-14",
    type: "Announcement",
  },
];

const navItems: { label: Tab; icon: string }[] = [
  { label: "Overview", icon: "▦" },
  { label: "Rooms", icon: "▤" },
  { label: "Mess", icon: "♨" },
  { label: "Hostel Details", icon: "⌂" },
  { label: "Gallery", icon: "▧" },
  { label: "Wardens", icon: "♙" },
  { label: "Rules & Notices", icon: "☷" },
];

export default function HostelAdmin() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [rooms, setRooms] = useState(initialRooms);
  const [selectedHostel, setSelectedHostel] = useState("Boys Hostel");
  const [menu, setMenu] = useState(initialMenu);
  const [notices, setNotices] = useState(initialNotices);
  const [mealTimings, setMealTimings] = useState({
    breakfast: "07:00 AM - 08:30 AM",
    lunch: "12:30 PM - 02:00 PM",
    snacks: "04:30 PM - 05:30 PM",
    dinner: "07:30 PM - 09:00 PM",
  });
  const [hostelDescriptions, setHostelDescriptions] = useState({
    boys:
      "The Boys Hostel provides a comfortable and student-friendly environment with accommodation, study facilities and recreational spaces.",
    girls:
      "The Girls Hostel provides a secure and comfortable residential environment with dedicated supervision and student facilities.",
  });
  const [wardens, setWardens] = useState([
    {
      id: 1,
      hostel: "Boys Hostel",
      name: "Hostel Warden",
      phone: "",
      email: "",
    },
    {
      id: 2,
      hostel: "Girls Hostel",
      name: "Hostel Warden",
      phone: "",
      email: "",
    },
  ]);
  const [gallery, setGallery] = useState([
    {
      id: 1,
      title: "Boys Hostel",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900",
    },
    {
      id: 2,
      title: "Girls Hostel",
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
    },
    {
      id: 3,
      title: "Dining Hall",
      url: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=900",
    },
  ]);
  const [toast, setToast] = useState("");

  const totalRooms = rooms.reduce((sum, item) => sum + item.totalRooms, 0);
  const occupiedRooms = rooms.reduce((sum, item) => sum + item.occupiedRooms, 0);
  const availableRooms = totalRooms - occupiedRooms;
  const totalCapacity = rooms.reduce((sum, item) => sum + item.capacity, 0);

  const currentRoom = rooms.find((item) => item.hostel === selectedHostel)!;
  const currentAvailable = currentRoom.totalRooms - currentRoom.occupiedRooms;

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  };

  const updateRoom = (field: keyof RoomData, value: number) => {
    setRooms((previous) =>
      previous.map((item) =>
        item.hostel === selectedHostel
          ? { ...item, [field]: Math.max(0, value) }
          : item
      )
    );
  };

  const updateRoomType = (index: number, value: number) => {
    setRooms((previous) =>
      previous.map((item) =>
        item.hostel === selectedHostel
          ? {
              ...item,
              roomTypes: item.roomTypes.map((type, i) =>
                i === index ? { ...type, count: Math.max(0, value) } : type
              ),
            }
          : item
      )
    );
  };

  const addMenuDay = () => {
    const day = window.prompt("Enter day name:");
    if (!day?.trim()) return;

    setMenu((previous) => [
      ...previous,
      {
        id: Date.now(),
        day: day.trim(),
        breakfast: "Not updated",
        lunch: "Not updated",
        snacks: "Not updated",
        dinner: "Not updated",
      },
    ]);
    notify("Menu day added");
  };

  const updateMenu = (
    id: number,
    field: keyof MenuItem,
    value: string
  ) => {
    setMenu((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addNotice = () => {
    const title = window.prompt("Enter notice title:");
    if (!title?.trim()) return;

    const description = window.prompt("Enter notice description:");
    if (!description?.trim()) return;

    setNotices((previous) => [
      {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        date: new Date().toISOString().slice(0, 10),
        type: "Announcement",
      },
      ...previous,
    ]);
    notify("Announcement added");
  };

  const addGalleryImage = () => {
    const title = window.prompt("Enter image title:");
    if (!title?.trim()) return;

    const url = window.prompt("Enter image URL:");
    if (!url?.trim()) return;

    setGallery((previous) => [
      ...previous,
      { id: Date.now(), title: title.trim(), url: url.trim() },
    ]);
    notify("Gallery image added");
  };

  const updateWarden = (
    id: number,
    field: "name" | "phone" | "email",
    value: string
  ) => {
    setWardens((previous) =>
      previous.map((warden) =>
        warden.id === id ? { ...warden, [field]: value } : warden
      )
    );
  };

  const saveChanges = () => {
    notify("Demo changes saved in this session");
  };

  return (
    <div className="hostel-admin">
      <style>{`
        .hostel-admin {
          --ha-maroon: #741d36;
          --ha-maroon-dark: #4b1427;
          --ha-gold: #d5ad62;
          --ha-bg: #f6f5f3;
          --ha-text: #29252a;
          --ha-muted: #817982;
          min-height: 100vh;
          display: flex;
          background: var(--ha-bg);
          color: var(--ha-text);
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
          .hostel-admin {
  padding-top: 100px;
  min-height: 100vh;
  box-sizing: border-box;
}
        .ha-sidebar {
          width: 255px;
          flex-shrink: 0;
          min-height: 100vh;
          background: var(--ha-maroon-dark);
          color: white;
          padding: 25px 16px;
          display: flex;
          flex-direction: column;
        }
        .ha-brand {
          padding: 4px 12px 25px;
          border-bottom: 1px solid rgba(255,255,255,.13);
          margin-bottom: 25px;
        }
        .ha-brand-mark {
          width: 43px;
          height: 43px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          color: var(--ha-maroon-dark);
          background: var(--ha-gold);
          font-weight: 900;
          font-size: 21px;
          margin-bottom: 13px;
        }
        .ha-brand strong { display: block; font-size: 15px; }
        .ha-brand span { display: block; color: #d9c4ca; font-size: 11px; margin-top: 5px; }
        .ha-nav-label {
          color: #c6aab3;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          padding: 0 12px;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .ha-nav { display: grid; gap: 6px; }
        .ha-nav button {
          width: 100%;
          border: 0;
          background: transparent;
          color: #eadde1;
          border-radius: 9px;
          text-align: left;
          padding: 12px 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          transition: .2s;
        }
        .ha-nav button:hover, .ha-nav button.active {
          background: rgba(255,255,255,.13);
          color: white;
        }
        .ha-nav button.active { box-shadow: inset 3px 0 var(--ha-gold); }
        .ha-nav-icon { width: 20px; text-align: center; color: var(--ha-gold); font-size: 17px; }
        .ha-sidebar-bottom {
          margin-top: auto;
          padding: 17px 12px 0;
          border-top: 1px solid rgba(255,255,255,.13);
          color: #d9c4ca;
          font-size: 11px;
          line-height: 1.7;
        }
        .ha-main { flex: 1; min-width: 0; }
        .ha-topbar {
          min-height: 75px;
          background: white;
          border-bottom: 1px solid #ece8e8;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 30px;
          gap: 15px;
        }
        .ha-topbar h1 { font-size: 19px; margin: 0; color: var(--ha-maroon-dark); }
        .ha-topbar p { margin: 4px 0 0; color: var(--ha-muted); font-size: 11px; }
        .ha-admin-user { display: flex; align-items: center; gap: 10px; }
        .ha-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          display: grid; place-items: center;
          background: #f0e3e6; color: var(--ha-maroon); font-weight: 800;
        }
        .ha-admin-user strong { display: block; font-size: 12px; }
        .ha-admin-user small { color: var(--ha-muted); font-size: 10px; }
        .ha-content { max-width: 1500px; margin: auto; padding: 28px 30px 50px; }
        .ha-welcome {
          background: linear-gradient(110deg, #4b1427, #842b46);
          color: white; border-radius: 15px; padding: 25px 27px;
          display: flex; justify-content: space-between; align-items: center;
          gap: 20px; margin-bottom: 23px;
        }
        .ha-welcome h2 { margin: 0; font-size: 21px; }
        .ha-welcome p { color: #ead9de; font-size: 12px; margin: 7px 0 0; }
        .ha-welcome-tag {
          border: 1px solid rgba(255,255,255,.3); border-radius: 30px;
          padding: 8px 13px; font-size: 11px; white-space: nowrap;
        }
        .ha-grid { display: grid; gap: 16px; }
        .ha-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-bottom: 22px; }
        .ha-card {
          background: white; border: 1px solid #eee9e9;
          border-radius: 13px; padding: 19px;
          box-shadow: 0 3px 12px rgba(45,20,30,.025);
          min-width: 0;
        }
        .ha-stat-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .ha-stat-label { color: var(--ha-muted); font-size: 11px; font-weight: 600; }
        .ha-stat-icon {
          width: 34px; height: 34px; border-radius: 10px;
          background: #f6edf0; color: var(--ha-maroon);
          display: grid; place-items: center; font-size: 16px;
        }
        .ha-stat-value { font-size: 27px; font-weight: 800; margin-top: 12px; color: var(--ha-maroon-dark); }
        .ha-stat-note { font-size: 10px; color: var(--ha-muted); margin-top: 5px; }
        .ha-two-col { grid-template-columns: 1.35fr 1fr; }
        .ha-section-title {
          display: flex; justify-content: space-between; align-items: center;
          gap: 12px; margin-bottom: 16px;
        }
        .ha-section-title h3 { margin: 0; color: var(--ha-maroon-dark); font-size: 14px; }
        .ha-section-title p { margin: 4px 0 0; color: var(--ha-muted); font-size: 11px; }
        .ha-hostel-row { border: 1px solid #eee9e9; border-radius: 10px; padding: 14px; margin-top: 11px; }
        .ha-hostel-row-top { display: flex; justify-content: space-between; gap: 10px; font-size: 12px; font-weight: 700; }
        .ha-progress { height: 7px; border-radius: 20px; background: #f0edef; overflow: hidden; margin: 13px 0 8px; }
        .ha-progress > div { height: 100%; background: var(--ha-maroon); border-radius: inherit; }
        .ha-small-stats { display: flex; gap: 18px; flex-wrap: wrap; color: var(--ha-muted); font-size: 10px; }
        .ha-small-stats strong { color: var(--ha-text); }
        .ha-activity { display: grid; gap: 15px; }
        .ha-activity-item { display: flex; align-items: flex-start; gap: 11px; }
        .ha-activity-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--ha-gold); margin-top: 4px; flex-shrink: 0; }
        .ha-activity-item strong { display: block; font-size: 11px; }
        .ha-activity-item span { display: block; font-size: 10px; color: var(--ha-muted); margin-top: 4px; }
        .ha-page-heading { margin-bottom: 20px; }
        .ha-page-heading h2 { margin: 0; font-size: 20px; color: var(--ha-maroon-dark); }
        .ha-page-heading p { margin: 6px 0 0; font-size: 12px; color: var(--ha-muted); }
        .ha-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 15px; }
        .ha-field { display: grid; gap: 7px; margin-bottom: 14px; }
        .ha-field label { font-size: 11px; font-weight: 700; color: #5c5057; }
        .ha-input, .ha-select, .ha-textarea {
          width: 100%; box-sizing: border-box; border: 1px solid #e7dfe2;
          border-radius: 8px; background: white; color: var(--ha-text);
          padding: 10px 11px; font: inherit; font-size: 12px; outline: none;
        }
        .ha-input:focus, .ha-select:focus, .ha-textarea:focus { border-color: var(--ha-maroon); box-shadow: 0 0 0 3px #741d3612; }
        .ha-textarea { min-height: 100px; resize: vertical; line-height: 1.6; }
        .ha-btn {
          border: 0; border-radius: 8px; background: var(--ha-maroon);
          color: white; padding: 10px 15px; cursor: pointer;
          font-size: 11px; font-weight: 700; transition: .2s;
        }
        .ha-btn:hover { background: var(--ha-maroon-dark); }
        .ha-btn.secondary { background: #f3e9ec; color: var(--ha-maroon); }
        .ha-btn.secondary:hover { background: #ead8de; }
        .ha-btn.danger { background: #fff0f0; color: #b33d3d; }
        .ha-btn.small { padding: 7px 10px; }
        .ha-actions { display: flex; flex-wrap: wrap; gap: 8px; }
        .ha-table-wrap { overflow-x: auto; }
        .ha-table { width: 100%; border-collapse: collapse; min-width: 650px; }
        .ha-table th {
          text-align: left; padding: 12px 10px; color: var(--ha-muted);
          background: #faf8f8; font-size: 10px; font-weight: 800;
          text-transform: uppercase; letter-spacing: .5px;
        }
        .ha-table td { border-bottom: 1px solid #f0ebed; padding: 12px 10px; font-size: 11px; }
        .ha-table input { min-width: 115px; }
        .ha-pill {
          display: inline-flex; padding: 5px 9px; border-radius: 30px;
          background: #e9f5ed; color: #267346; font-size: 10px; font-weight: 700;
        }
        .ha-pill.warning { background: #fff5e6; color: #a16a19; }
        .ha-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
        .ha-tabs button {
          border: 1px solid #e9dfe2; border-radius: 7px; background: white;
          padding: 9px 13px; color: #6c5b63; font-size: 11px; cursor: pointer;
        }
        .ha-tabs button.active { background: var(--ha-maroon); border-color: var(--ha-maroon); color: white; }
        .ha-image-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 15px; }
        .ha-image-card { border: 1px solid #eee7e9; border-radius: 10px; overflow: hidden; background: white; }
        .ha-image-card img { width: 100%; height: 145px; object-fit: cover; display: block; background: #eee; }
        .ha-image-card-body { padding: 12px; }
        .ha-image-card-body strong { font-size: 11px; display: block; margin-bottom: 10px; }
        .ha-notice { border: 1px solid #eee8ea; border-radius: 10px; padding: 14px; margin-bottom: 10px; }
        .ha-notice h4 { margin: 8px 0 5px; font-size: 13px; }
        .ha-notice p { color: var(--ha-muted); font-size: 11px; line-height: 1.6; margin: 0 0 10px; }
        .ha-notice small { color: var(--ha-muted); font-size: 10px; }
        .ha-empty { padding: 30px; text-align: center; color: var(--ha-muted); font-size: 12px; }
        .ha-toast {
          position: fixed; bottom: 24px; right: 24px; z-index: 20;
          background: #2d563d; color: white; padding: 13px 18px;
          border-radius: 9px; box-shadow: 0 8px 25px #0002; font-size: 12px;
        }
        @media(max-width: 1000px) {
          .ha-sidebar { width: 215px; }
          .ha-stats { grid-template-columns: repeat(2,minmax(0,1fr)); }
          .ha-two-col { grid-template-columns: 1fr; }
        }
        @media(max-width: 700px) {
          .hostel-admin { display: block; }
          .ha-sidebar { width: auto; min-height: auto; padding: 13px; }
          .ha-brand { display: flex; align-items: center; gap: 10px; padding: 3px 5px 12px; margin-bottom: 12px; }
          .ha-brand-mark { margin: 0; width: 35px; height: 35px; }
          .ha-brand span { display: none; }
          .ha-nav { display: flex; overflow-x: auto; padding-bottom: 3px; }
          .ha-nav-label, .ha-sidebar-bottom { display: none; }
          .ha-nav button { width: auto; white-space: nowrap; padding: 9px 11px; font-size: 11px; }
          .ha-nav button.active { box-shadow: inset 0 -3px var(--ha-gold); }
          .ha-topbar { padding: 13px 16px; }
          .ha-topbar h1 { font-size: 16px; }
          .ha-admin-user > div:last-child { display: none; }
          .ha-content { padding: 18px 14px 35px; }
          .ha-welcome { padding: 20px; align-items: flex-start; }
          .ha-welcome h2 { font-size: 17px; }
          .ha-welcome-tag { display: none; }
          .ha-stats { gap: 10px; }
          .ha-card { padding: 14px; }
          .ha-stat-value { font-size: 23px; }
          .ha-form-grid { grid-template-columns: 1fr; gap: 0; }
          .ha-image-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
        }
        @media(max-width: 420px) {
          .ha-stats { grid-template-columns: 1fr 1fr; }
          .ha-image-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <aside className="ha-sidebar">
        <div className="ha-brand">
          <div className="ha-brand-mark">SL</div>
          <div>
            <strong>ST. LOURDES</strong>
            <span>HOSTEL ADMINISTRATION</span>
          </div>
        </div>

        <div className="ha-nav-label">Management</div>
        <nav className="ha-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={activeTab === item.label ? "active" : ""}
              onClick={() => setActiveTab(item.label)}
            >
              <span className="ha-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ha-sidebar-bottom">
          <strong>St. Lourdes Engineering College</strong>
          <br />
          Hostel Administration Portal
          <br />
          Demo version · 2026
        </div>
      </aside>

      <main className="ha-main">
     

        <div className="ha-content">
          {activeTab === "Overview" && (
            <>
              <section className="ha-welcome">
                <div>
                  <h2>Welcome to Hostel Administration</h2>
                  <p>Manage rooms, mess schedules, hostel facilities and student notices.</p>
                </div>
                <div className="ha-welcome-tag">● Management Portal</div>
              </section>

              <div className="ha-grid ha-stats">
                {[
                  { label: "Total Rooms", value: totalRooms, icon: "▤", note: "Boys + Girls hostels" },
                  { label: "Occupied Rooms", value: occupiedRooms, icon: "♙", note: "Currently occupied" },
                  { label: "Available Rooms", value: availableRooms, icon: "✓", note: "Rooms available" },
                  { label: "Student Capacity", value: totalCapacity, icon: "♧", note: "Total accommodation capacity" },
                ].map((stat) => (
                  <div className="ha-card" key={stat.label}>
                    <div className="ha-stat-top">
                      <span className="ha-stat-label">{stat.label}</span>
                      <span className="ha-stat-icon">{stat.icon}</span>
                    </div>
                    <div className="ha-stat-value">{stat.value}</div>
                    <div className="ha-stat-note">{stat.note}</div>
                  </div>
                ))}
              </div>

              <div className="ha-grid ha-two-col">
                <section className="ha-card">
                  <div className="ha-section-title">
                    <div>
                      <h3>Hostel Room Overview</h3>
                      <p>Room occupancy for boys and girls hostels</p>
                    </div>
                    <button className="ha-btn secondary small" onClick={() => setActiveTab("Rooms")}>
                      Manage Rooms
                    </button>
                  </div>
                  {rooms.map((room) => {
                    const available = room.totalRooms - room.occupiedRooms;
                    const percent = room.totalRooms
                      ? Math.min(100, (room.occupiedRooms / room.totalRooms) * 100)
                      : 0;
                    return (
                      <div className="ha-hostel-row" key={room.hostel}>
                        <div className="ha-hostel-row-top">
                          <span>{room.hostel}</span>
                          <span>{Math.round(percent)}% occupied</span>
                        </div>
                        <div className="ha-progress">
                          <div style={{ width: `${percent}%` }} />
                        </div>
                        <div className="ha-small-stats">
                          <span>Total: <strong>{room.totalRooms}</strong></span>
                          <span>Occupied: <strong>{room.occupiedRooms}</strong></span>
                          <span>Available: <strong>{available}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </section>

                <section className="ha-card">
                  <div className="ha-section-title">
                    <div>
                      <h3>Management Shortcuts</h3>
                      <p>Quick access to hostel settings</p>
                    </div>
                  </div>
                  <div className="ha-activity">
                    {[
                      ["▤", "Update room availability", "Manage boys and girls room counts", "Rooms"],
                      ["♨", "Update mess menu", "Edit meals and food timings", "Mess"],
                      ["▧", "Manage hostel gallery", "Add or remove hostel photographs", "Gallery"],
                      ["☷", "Publish hostel notice", "Add rules and announcements", "Rules & Notices"],
                    ].map(([icon, title, description, tab]) => (
                      <div className="ha-activity-item" key={title}>
                        <div className="ha-stat-icon">{icon}</div>
                        <div style={{ flex: 1 }}>
                          <strong>{title}</strong>
                          <span>{description}</span>
                        </div>
                        <button className="ha-btn secondary small" onClick={() => setActiveTab(tab as Tab)}>
                          Open
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </>
          )}

          {activeTab === "Rooms" && (
            <>
              <div className="ha-page-heading">
                <h2>Room Management</h2>
                <p>Update room availability, accommodation types and student capacity.</p>
              </div>
              <div className="ha-tabs">
                {rooms.map((room) => (
                  <button
                    key={room.hostel}
                    className={selectedHostel === room.hostel ? "active" : ""}
                    onClick={() => setSelectedHostel(room.hostel)}
                  >
                    {room.hostel}
                  </button>
                ))}
              </div>
              <div className="ha-grid ha-two-col">
                <section className="ha-card">
                  <div className="ha-section-title">
                    <div>
                      <h3>{selectedHostel} – Room Availability</h3>
                      <p>Change the room statistics below</p>
                    </div>
                    <span className="ha-pill">Active</span>
                  </div>
                  <div className="ha-form-grid">
                    <div className="ha-field">
                      <label>Total Rooms</label>
                      <input className="ha-input" type="number" min="0" value={currentRoom.totalRooms}
                        onChange={(e) => updateRoom("totalRooms", Number(e.target.value))} />
                    </div>
                    <div className="ha-field">
                      <label>Occupied Rooms</label>
                      <input className="ha-input" type="number" min="0" max={currentRoom.totalRooms}
                        value={currentRoom.occupiedRooms}
                        onChange={(e) => updateRoom("occupiedRooms", Math.min(currentRoom.totalRooms, Number(e.target.value)))} />
                    </div>
                    <div className="ha-field">
                      <label>Student Capacity</label>
                      <input className="ha-input" type="number" min="0" value={currentRoom.capacity}
                        onChange={(e) => updateRoom("capacity", Number(e.target.value))} />
                    </div>
                    <div className="ha-field">
                      <label>Available Rooms</label>
                      <input className="ha-input" value={currentAvailable} readOnly />
                    </div>
                  </div>
                  <button className="ha-btn" onClick={saveChanges}>Save Room Details</button>
                </section>

                <section className="ha-card">
                  <div className="ha-section-title">
                    <div>
                      <h3>Room Type Distribution</h3>
                      <p>Set the number of rooms under each type</p>
                    </div>
                  </div>
                  {currentRoom.roomTypes.map((type, index) => (
                    <div className="ha-field" key={type.name}>
                      <label>{type.name}</label>
                      <input className="ha-input" type="number" min="0" value={type.count}
                        onChange={(e) => updateRoomType(index, Number(e.target.value))} />
                    </div>
                  ))}
                  <p style={{ fontSize: 10, color: "var(--ha-muted)", lineHeight: 1.6 }}>
                    Ensure the room type counts add up to the total room count.
                  </p>
                  <div className="ha-actions">
                    <span className="ha-pill">{currentAvailable} rooms available</span>
                    <span className="ha-pill warning">{currentRoom.occupiedRooms} occupied</span>
                  </div>
                </section>
              </div>
            </>
          )}

          {activeTab === "Mess" && (
            <>
              <div className="ha-page-heading">
                <h2>Mess Management</h2>
                <p>Manage weekly food menus and meal serving timings.</p>
              </div>
              <section className="ha-card" style={{ marginBottom: 17 }}>
                <div className="ha-section-title">
                  <div>
                    <h3>Meal Timings</h3>
                    <p>Update the time for each meal</p>
                  </div>
                </div>
                <div className="ha-form-grid">
                  {(Object.keys(mealTimings) as (keyof typeof mealTimings)[]).map((meal) => (
                    <div className="ha-field" key={meal}>
                      <label>{meal.charAt(0).toUpperCase() + meal.slice(1)} Timing</label>
                      <input className="ha-input" value={mealTimings[meal]}
                        onChange={(e) => setMealTimings((prev) => ({ ...prev, [meal]: e.target.value }))} />
                    </div>
                  ))}
                </div>
                <button className="ha-btn" onClick={saveChanges}>Save Meal Timings</button>
              </section>

              <section className="ha-card">
                <div className="ha-section-title">
                  <div>
                    <h3>Weekly Mess Menu</h3>
                    <p>Edit the menu for each day of the week</p>
                  </div>
                  <button className="ha-btn" onClick={addMenuDay}>+ Add Day</button>
                </div>
                <div className="ha-table-wrap">
                  <table className="ha-table">
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Snacks</th>
                        <th>Dinner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menu.map((item) => (
                        <tr key={item.id}>
                          <td><strong>{item.day}</strong></td>
                          {(["breakfast", "lunch", "snacks", "dinner"] as const).map((field) => (
                            <td key={field}>
                              <input className="ha-input" value={item[field]}
                                onChange={(e) => updateMenu(item.id, field, e.target.value)} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: 16 }}>
                  <button className="ha-btn" onClick={saveChanges}>Save Weekly Menu</button>
                </div>
              </section>
            </>
          )}

          {activeTab === "Hostel Details" && (
            <>
              <div className="ha-page-heading">
                <h2>Hostel Details</h2>
                <p>Manage public hostel descriptions and facilities.</p>
              </div>
              <div className="ha-grid ha-two-col">
                <section className="ha-card">
                  <div className="ha-section-title"><h3>Boys Hostel Description</h3></div>
                  <div className="ha-field">
                    <label>Description shown on public website</label>
                    <textarea className="ha-textarea" value={hostelDescriptions.boys}
                      onChange={(e) => setHostelDescriptions((prev) => ({ ...prev, boys: e.target.value }))} />
                  </div>
                  <button className="ha-btn" onClick={saveChanges}>Save Boys Hostel Details</button>
                </section>
                <section className="ha-card">
                  <div className="ha-section-title"><h3>Girls Hostel Description</h3></div>
                  <div className="ha-field">
                    <label>Description shown on public website</label>
                    <textarea className="ha-textarea" value={hostelDescriptions.girls}
                      onChange={(e) => setHostelDescriptions((prev) => ({ ...prev, girls: e.target.value }))} />
                  </div>
                  <button className="ha-btn" onClick={saveChanges}>Save Girls Hostel Details</button>
                </section>
              </div>
            </>
          )}

          {activeTab === "Gallery" && (
            <>
              <div className="ha-page-heading">
                <h2>Hostel Gallery</h2>
                <p>Manage photographs displayed on the public hostel page.</p>
              </div>
              <section className="ha-card">
                <div className="ha-section-title">
                  <div>
                    <h3>Hostel Photographs</h3>
                    <p>Demo gallery uses image URLs. Connect file uploads in the backend later.</p>
                  </div>
                  <button className="ha-btn" onClick={addGalleryImage}>+ Add Image</button>
                </div>
                <div className="ha-image-grid">
                  {gallery.map((image) => (
                    <div className="ha-image-card" key={image.id}>
                      <img src={image.url} alt={image.title}
                        onError={(e) => { e.currentTarget.style.opacity = "0.25"; }} />
                      <div className="ha-image-card-body">
                        <strong>{image.title}</strong>
                        <button className="ha-btn danger small"
                          onClick={() => setGallery((prev) => prev.filter((item) => item.id !== image.id))}>
                          Remove Image
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === "Wardens" && (
            <>
              <div className="ha-page-heading">
                <h2>Warden Contact Details</h2>
                <p>Update the contact information for the hostel wardens.</p>
              </div>
              <div className="ha-grid ha-two-col">
                {wardens.map((warden) => (
                  <section className="ha-card" key={warden.id}>
                    <div className="ha-section-title">
                      <div>
                        <h3>{warden.hostel}</h3>
                        <p>Warden information</p>
                      </div>
                      <span className="ha-stat-icon">♙</span>
                    </div>
                    <div className="ha-field">
                      <label>Warden Name</label>
                      <input className="ha-input" value={warden.name}
                        onChange={(e) => updateWarden(warden.id, "name", e.target.value)} />
                    </div>
                    <div className="ha-field">
                      <label>Phone Number</label>
                      <input className="ha-input" type="tel" placeholder="Enter phone number"
                        value={warden.phone}
                        onChange={(e) => updateWarden(warden.id, "phone", e.target.value)} />
                    </div>
                    <div className="ha-field">
                      <label>Email Address</label>
                      <input className="ha-input" type="email" placeholder="Enter email address"
                        value={warden.email}
                        onChange={(e) => updateWarden(warden.id, "email", e.target.value)} />
                    </div>
                    <button className="ha-btn" onClick={saveChanges}>Save Warden Details</button>
                  </section>
                ))}
              </div>
            </>
          )}

          {activeTab === "Rules & Notices" && (
            <>
              <div className="ha-page-heading">
                <h2>Rules & Announcements</h2>
                <p>Publish hostel rules, important notices and student announcements.</p>
              </div>
              <section className="ha-card">
                <div className="ha-section-title">
                  <div>
                    <h3>Published Notices</h3>
                    <p>Manage information visible to students and parents.</p>
                  </div>
                  <button className="ha-btn" onClick={addNotice}>+ Add Announcement</button>
                </div>
                {notices.length === 0 && <div className="ha-empty">No notices have been added.</div>}
                {notices.map((notice) => (
                  <article className="ha-notice" key={notice.id}>
                    <div className="ha-actions" style={{ justifyContent: "space-between" }}>
                      <span className={`ha-pill ${notice.type === "Rule" ? "warning" : ""}`}>{notice.type}</span>
                      <small>{notice.date}</small>
                    </div>
                    <h4>{notice.title}</h4>
                    <p>{notice.description}</p>
                    <button className="ha-btn danger small"
                      onClick={() => setNotices((prev) => prev.filter((item) => item.id !== notice.id))}>
                      Delete Notice
                    </button>
                  </article>
                ))}
              </section>
            </>
          )}
        </div>
      </main>

      {toast && <div className="ha-toast">{toast}</div>}
    </div>
  );
}