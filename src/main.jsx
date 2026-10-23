import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  LayoutDashboard, Package, ArrowDownToLine, ArrowUpFromLine, RefreshCw,
  BellRing, Truck, ChartNoAxesCombined, Users, Settings, Search, Bell,
  ChevronDown, Plus, Download, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  AlertTriangle, CheckCircle2, Clock3, Boxes, ShoppingBasket, ScanBarcode,
  SlidersHorizontal, FileSpreadsheet, CalendarDays, Menu, X, CircleHelp,
  Filter, Eye, Check, XCircle, Edit3, ArrowUpDown, Tag, UserCheck, ShieldCheck,
  Building2, Phone, Mail, MapPin
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import './style.css';

const nav = [
  { section: 'RINGKASAN', items: [['Dashboard', LayoutDashboard], ['Produk & Varian', Package], ['Barang Masuk', ArrowDownToLine], ['Barang Keluar', ArrowUpFromLine]] },
  { section: 'PENGELOLAAN', items: [['Stock Opname', RefreshCw], ['Peringatan Restock', BellRing], ['Pemasok', Truck], ['Mutasi Stok', Boxes]] },
  { section: 'ANALISIS', items: [['Laporan', ChartNoAxesCombined], ['Pengguna', Users]] }
];

const presetColors = [
  { name: 'Cream', hex: '#e8d7bd' },
  { name: 'Hitam', hex: '#343b3c' },
  { name: 'Olive', hex: '#8b9275' },
  { name: 'Putih', hex: '#f2f0e8' },
  { name: 'Mocca', hex: '#a98770' },
  { name: 'Lilac', hex: '#b7a6c8' },
  { name: 'Sage', hex: '#9cb89c' },
  { name: 'Dusty Rose', hex: '#d9a5a5' },
  { name: 'Terracotta', hex: '#c27055' },
  { name: 'Navy', hex: '#2b3a4a' }
];

const presetSizes = ['115 × 115 cm', '180 × 75 cm', '110 × 110 cm', 'All size'];

const initialSuppliers = [
  { id: 'SUP-01', name: 'CV Berkah Textile', categories: 'Voal, Jersey', phone: '0812-8800-1221', email: 'supplier@berkahtextile.id', address: 'Jl. Raya Bogor KM 42, Cibinong', status: 'Aktif' },
  { id: 'SUP-02', name: 'Hijab Supply Bogor', categories: 'Ceruty, Voal Premium', phone: '0813-9912-4550', email: 'halo@hijabsupply.id', address: 'Jl. Pajajaran No. 18, Bogor Tengah', status: 'Aktif' },
  { id: 'SUP-03', name: 'Sakura Hijab', categories: 'Paris, Ceruty', phone: '0857-2100-3210', email: 'sakura@supplier.id', address: 'Komp. Ruko Cibinong City Blok B-4', status: 'Aktif' }
];

const initialProducts = [
  { sku: 'SKL-VL-SQ-CRM', name: 'Voal Premium', variant: 'Segi empat · Cream', material: 'Voal', model: 'Segi empat', color: 'Cream', size: '115 × 115 cm', stock: 42, min: 20, price: 28000, category: 'Daily Wear', supplier: 'CV Berkah Textile', tone: '#e8d7bd' },
  { sku: 'SKL-CT-PM-BLK', name: 'Ceruty Babydoll', variant: 'Pashmina · Hitam', material: 'Ceruty', model: 'Pashmina', color: 'Hitam', size: '180 × 75 cm', stock: 8, min: 15, price: 32000, category: 'Premium', supplier: 'Hijab Supply Bogor', tone: '#343b3c' },
  { sku: 'SKL-JR-IN-OLV', name: 'Jersey Premium', variant: 'Instan · Olive', material: 'Jersey', model: 'Instan', color: 'Olive', size: 'All size', stock: 6, min: 12, price: 35000, category: 'Instant', supplier: 'CV Berkah Textile', tone: '#8b9275' },
  { sku: 'SKL-PR-SQ-WHT', name: 'Paris Japan', variant: 'Segi empat · Putih', material: 'Paris', model: 'Segi empat', color: 'Putih', size: '110 × 110 cm', stock: 56, min: 20, price: 18000, category: 'Daily Wear', supplier: 'Sakura Hijab', tone: '#f2f0e8' },
  { sku: 'SKL-VL-PM-MOC', name: 'Voal Ultrafine', variant: 'Pashmina · Mocca', material: 'Voal', model: 'Pashmina', color: 'Mocca', size: '180 × 75 cm', stock: 14, min: 15, price: 30000, category: 'Premium', supplier: 'Hijab Supply Bogor', tone: '#a98770' },
  { sku: 'SKL-CT-SQ-LIL', name: 'Ceruty Babydoll', variant: 'Segi empat · Lilac', material: 'Ceruty', model: 'Segi empat', color: 'Lilac', size: '115 × 115 cm', stock: 27, min: 12, price: 32000, category: 'Daily Wear', supplier: 'Sakura Hijab', tone: '#b7a6c8' }
];

const initialMutations = [
  { id: 'MUT-1024', time: '23 Okt 2026, 14:32', type: 'Barang masuk', product: 'Voal Premium', sku: 'SKL-VL-SQ-CRM', delta: 24, officer: 'Rahayu A. (Owner)', ref: 'INV-1024', note: 'Restock mingguan dari pemasok' },
  { id: 'MUT-1023', time: '23 Okt 2026, 13:10', type: 'Barang keluar', subType: 'Penjualan harian', product: 'Ceruty Babydoll', sku: 'SKL-CT-PM-BLK', delta: -5, officer: 'Staf Gudang (Admin)', ref: 'TRX-2810', note: 'Penjualan harian toko' },
  { id: 'MUT-1022', time: '22 Okt 2026, 16:45', type: 'Penyesuaian stok', product: 'Jersey Premium', sku: 'SKL-JR-IN-OLV', delta: -2, officer: 'Rahayu A. (Owner)', ref: 'SO-009', note: 'Barang rusak saat display' },
  { id: 'MUT-1021', time: '22 Okt 2026, 11:22', type: 'Barang keluar', subType: 'Penjualan harian', product: 'Paris Japan', sku: 'SKL-PR-SQ-WHT', delta: -8, officer: 'Staf Gudang (Admin)', ref: 'TRX-2801', note: 'Penjualan grosir pelanggan' },
  { id: 'MUT-1020', time: '21 Okt 2026, 09:14', type: 'Barang masuk', product: 'Voal Ultrafine', sku: 'SKL-VL-PM-MOC', delta: 30, officer: 'Rahayu A. (Owner)', ref: 'INV-1021', note: 'Penerimaan faktur pemasok' }
];

const chartData = [
  { day: 'Sen', masuk: 42, keluar: 28 },
  { day: 'Sel', masuk: 35, keluar: 41 },
  { day: 'Rab', masuk: 58, keluar: 34 },
  { day: 'Kam', masuk: 30, keluar: 47 },
  { day: 'Jum', masuk: 66, keluar: 39 },
  { day: 'Sab', masuk: 48, keluar: 55 },
  { day: 'Min', masuk: 72, keluar: 31 }
];

const money = n => 'Rp ' + new Intl.NumberFormat('id-ID').format(n);

function formatNow() {
  const d = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const day = d.getDate();
  const mon = months[d.getMonth()];
  const yr = d.getFullYear();
  const hr = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${day} ${mon} ${yr}, ${hr}:${min}`;
}

function BarcodeVisual({ sku }) {
  const bars = useMemo(() => {
    const pattern = [];
    for (let i = 0; i < (sku || '').length; i++) {
      const code = sku.charCodeAt(i);
      pattern.push(((code % 3) + 1.2));
      pattern.push((((code * 3) % 4) + 1));
    }
    return pattern;
  }, [sku]);

  let currentX = 12;
  return (
    <div className="barcode-box">
      <svg viewBox="0 0 240 48" preserveAspectRatio="none">
        {bars.map((w, idx) => {
          const x = currentX;
          currentX += w + 2.4;
          if (currentX > 230) return null;
          return <rect key={idx} x={x} y="4" width={w} height="40" fill="#203330" rx="0.5" />;
        })}
      </svg>
      <code>{sku}</code>
    </div>
  );
}

function CategoryBadge({ category }) {
  const cls = category === 'Premium' ? 'premium' : category === 'Instant' ? 'instant' : 'daily';
  return <span className={`badge-category ${cls}`}>{category}</span>;
}

function App() {
  const [page, setPage] = useState('Dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [mutations, setMutations] = useState(initialMutations);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [restockStatusMap, setRestockStatusMap] = useState({}); // sku -> 'suggested' | 'pending' | 'approved' | 'received'
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState('');
  const [detailProduct, setDetailProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [detailSupplier, setDetailSupplier] = useState(null);
  const [detailUser, setDetailUser] = useState(null);
  const [opnameConfirmModal, setOpnameConfirmModal] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [filterCat, setFilterCat] = useState('Semua');
  const [filterMat, setFilterMat] = useState('Semua');
  const [sortBy, setSortBy] = useState('name-asc');
  const [role, setRole] = useState('Owner');

  // Form states for new product
  const [formColor, setFormColor] = useState('Cream');
  const [formTone, setFormTone] = useState('#e8d7bd');
  const [formSize, setFormSize] = useState('115 × 115 cm');
  const [formMaterial, setFormMaterial] = useState('Voal');
  const [formModel, setFormModel] = useState('Segi empat');
  const [formCategory, setFormCategory] = useState('Daily Wear');
  const [formSupplier, setFormSupplier] = useState('CV Berkah Textile');

  const low = products.filter(p => p.stock <= p.min);

  const filtered = useMemo(() => {
    return products
      .filter(p => {
        const matchesQuery = (p.name + ' ' + p.sku + ' ' + p.variant + ' ' + p.material + ' ' + p.color + ' ' + p.supplier + ' ' + p.category)
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesStatus =
          filter === 'Semua' ||
          (filter === 'Stok menipis' ? p.stock <= p.min : filter === 'Stok aman' ? p.stock > p.min : true);
        const matchesCat = filterCat === 'Semua' || p.category === filterCat;
        const matchesMat = filterMat === 'Semua' || p.material === filterMat;
        return matchesQuery && matchesStatus && matchesCat && matchesMat;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'stock-asc') return a.stock - b.stock;
        if (sortBy === 'stock-desc') return b.stock - a.stock;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [products, query, filter, filterCat, filterMat, sortBy]);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  };

  const go = (name) => {
    setPage(name);
    setMobileNav(false);
    setQuery('');
  };

  const handleOpenAddModal = () => {
    setFormColor('Cream');
    setFormTone('#e8d7bd');
    setFormSize('115 × 115 cm');
    setFormMaterial('Voal');
    setFormModel('Segi empat');
    setFormCategory('Daily Wear');
    setFormSupplier(suppliers[0]?.name || 'CV Berkah Textile');
    setModal('product');
  };

  const addProduct = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const matCode = formMaterial.slice(0, 2).toUpperCase();
    const modCode = formModel.slice(0, 2).toUpperCase();
    const colCode = formColor.slice(0, 3).toUpperCase();
    const genSku = `SKL-${matCode}-${modCode}-${colCode}`;

    const newProduct = {
      sku: genSku,
      name: f.get('name')?.toString() || 'Kerudung Baru',
      variant: `${formModel} · ${formColor}`,
      material: formMaterial,
      model: formModel,
      color: formColor,
      size: formSize || 'All size',
      stock: Number(f.get('stock') || 0),
      min: Number(f.get('min') || 10),
      price: Number(f.get('price') || 0),
      category: formCategory,
      supplier: formSupplier,
      tone: formTone
    };

    setProducts([newProduct, ...products]);
    setModal('');
    notify(`Produk varian ${newProduct.sku} berhasil ditambahkan`);
  };

  const handleSaveEditProduct = (e) => {
    e.preventDefault();
    if (!editProduct) return;
    const f = new FormData(e.currentTarget);
    const updated = {
      ...editProduct,
      min: Number(f.get('min') || editProduct.min),
      price: Number(f.get('price') || editProduct.price),
      supplier: f.get('supplier')?.toString() || editProduct.supplier
    };

    setProducts(products.map(p => p.sku === updated.sku ? updated : p));
    if (detailProduct?.sku === updated.sku) {
      setDetailProduct(updated);
    }
    setEditProduct(null);
    notify(`Data produk ${updated.sku} berhasil diperbarui`);
  };

  // Supplier Add Handler
  const addSupplier = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const newSup = {
      id: `SUP-${String(suppliers.length + 1).padStart(2, '0')}`,
      name: f.get('name')?.toString() || 'Pemasok Baru',
      categories: f.get('categories')?.toString() || 'Voal, Ceruty',
      phone: f.get('phone')?.toString() || '0812-0000-0000',
      email: f.get('email')?.toString() || 'pemasok@mail.id',
      address: f.get('address')?.toString() || 'Bogor, Jawa Barat',
      status: 'Aktif'
    };
    setSuppliers([...suppliers, newSup]);
    setModal('');
    notify(`Pemasok ${newSup.name} berhasil ditambahkan`);
  };

  // Core Transaction Handlers
  const recordStockIn = ({ sku, qty, ref, supplier, note }) => {
    const p = products.find(x => x.sku === sku);
    if (!p || qty < 1) return;

    const officerName = role === 'Owner' ? 'Rahayu A. (Owner)' : 'Staf Gudang (Admin)';
    const newStock = p.stock + qty;

    const newMut = {
      id: `MUT-${Date.now().toString().slice(-4)}`,
      time: formatNow(),
      type: 'Barang masuk',
      product: p.name,
      sku: p.sku,
      delta: qty,
      officer: officerName,
      ref: ref || `INV-${Date.now().toString().slice(-4)}`,
      note: note || `Penerimaan dari ${supplier || p.supplier}`
    };

    setProducts(products.map(x => x.sku === sku ? { ...x, stock: newStock } : x));
    setMutations([newMut, ...mutations]);
    notify(`Barang masuk +${qty} unit (${p.name}) berhasil dicatat`);
  };

  const recordStockOut = ({ sku, qty, ref, outType, note }) => {
    const p = products.find(x => x.sku === sku);
    if (!p || qty < 1) return;

    if (qty > p.stock) {
      notify(`Jumlah keluar (${qty}) melebihi stok yang ada (${p.stock}). Stok tidak boleh negatif!`);
      return false;
    }

    const officerName = role === 'Owner' ? 'Rahayu A. (Owner)' : 'Staf Gudang (Admin)';
    const newStock = p.stock - qty;

    const newMut = {
      id: `MUT-${Date.now().toString().slice(-4)}`,
      time: formatNow(),
      type: 'Barang keluar',
      subType: outType || 'Penjualan harian',
      product: p.name,
      sku: p.sku,
      delta: -qty,
      officer: officerName,
      ref: ref || `TRX-${Date.now().toString().slice(-4)}`,
      note: note ? `${outType}: ${note}` : (outType || 'Pengeluaran stok')
    };

    setProducts(products.map(x => x.sku === sku ? { ...x, stock: newStock } : x));
    setMutations([newMut, ...mutations]);
    notify(`Barang keluar -${qty} unit (${p.name}) berhasil dicatat`);
    return true;
  };

  const applyOpnameAdjustments = (adjustments) => {
    if (!adjustments || adjustments.length === 0) {
      notify('Tidak ada varian dengan selisih untuk disesuaikan');
      return;
    }

    const officerName = role === 'Owner' ? 'Rahayu A. (Owner)' : 'Staf Gudang (Admin)';
    const newMutationsList = [];
    let updatedProducts = [...products];

    adjustments.forEach((adj, idx) => {
      const p = updatedProducts.find(x => x.sku === adj.sku);
      if (p) {
        updatedProducts = updatedProducts.map(x => x.sku === adj.sku ? { ...x, stock: adj.physical } : x);
        newMutationsList.push({
          id: `MUT-ADJ-${Date.now().toString().slice(-3)}-${idx}`,
          time: formatNow(),
          type: 'Penyesuaian stok',
          product: p.name,
          sku: p.sku,
          delta: adj.diff,
          officer: officerName,
          ref: `SO-${Date.now().toString().slice(-4)}`,
          note: adj.reason || (adj.diff < 0 ? 'Koreksi fisik berkurang' : 'Koreksi fisik bertambah')
        });
      }
    });

    setProducts(updatedProducts);
    setMutations([...newMutationsList, ...mutations]);
    setOpnameConfirmModal(null);
    notify(`${adjustments.length} varian berhasil disesuaikan dengan hasil hitung fisik`);
  };

  // Restock Workflow Handler (Sprint 3)
  const handleRestockAction = (sku, action, recommendedQty) => {
    const p = products.find(x => x.sku === sku);
    if (!p) return;

    if (action === 'submit') {
      setRestockStatusMap({ ...restockStatusMap, [sku]: 'pending' });
      notify(`Pengajuan restock ${p.name} (${recommendedQty} unit) dikirim untuk persetujuan Owner`);
    } else if (action === 'approve') {
      setRestockStatusMap({ ...restockStatusMap, [sku]: 'approved' });
      notify(`Permintaan restock ${p.name} telah DISETUJUI oleh Owner`);
    } else if (action === 'receive') {
      // Direct integration into stock in
      recordStockIn({
        sku: p.sku,
        qty: recommendedQty,
        ref: `RST-REC-${Date.now().toString().slice(-4)}`,
        supplier: p.supplier,
        note: `Penerimaan restock pesanan otomatis`
      });
      setRestockStatusMap({ ...restockStatusMap, [sku]: 'received' });
      notify(`Stok restock ${p.name} (+${recommendedQty} unit) berhasil diterima ke inventaris`);
    }
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">
            <span></span><span></span><span></span>
          </div>
          <div>
            <div className="brand-name">sakila<span>.</span></div>
            <div className="brand-sub">INVENTORY SYSTEM</div>
          </div>
          <button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Tutup menu">
            <X size={18} />
          </button>
        </div>

        <div className="store-switch">
          <div className="store-icon">HS</div>
          <div className="store-text">
            <strong>Toko Hijab Sakila</strong>
            <small>Kab. Bogor, Jawa Barat</small>
          </div>
          <ChevronDown size={15} className="muted-icon" />
        </div>

        <nav>
          {nav.map(group => (
            <div className="nav-group" key={group.section}>
              <div className="nav-label">{group.section}</div>
              {group.items.map(([name, Icon]) => (
                <button
                  key={name}
                  onClick={() => go(name)}
                  className={`nav-item ${page === name ? 'active' : ''}`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{name}</span>
                  {name === 'Peringatan Restock' && low.length > 0 && (
                    <span className="nav-count">{low.length}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><CircleHelp size={17} /></div>
            <div>
              <strong>Butuh bantuan?</strong>
              <p>Panduan penggunaan aplikasi</p>
              <button onClick={() => notify('Panduan lengkap operasional disiapkan untuk tahap panduan pengguna')}>
                Lihat panduan <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
          <button className="nav-item" onClick={() => notify('Pengaturan aplikasi masih berupa pratinjau')}>
            <Settings size={18} />
            <span>Pengaturan</span>
          </button>
          <div className="sidebar-version">
            SAKILA INVENTORY <span>v0.1.0 · PROTOTYPE COMPLETE</span>
          </div>
        </div>
      </aside>

      {mobileNav && <div className="mobile-scrim" onClick={() => setMobileNav(false)}></div>}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Buka navigasi">
              <Menu size={20} />
            </button>
            <div className="breadcrumbs">
              Workspace <span>/</span> <strong>{page}</strong>
            </div>
          </div>
          <div className="topbar-actions">
            <div className="global-search">
              <Search size={16} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari produk, SKU, varian..."
              />
              <kbd>⌘ K</kbd>
            </div>
            <button className="icon-btn notification-btn" onClick={() => go('Peringatan Restock')} aria-label="Notifikasi restock">
              <Bell size={18} />
              {low.length > 0 && <i />}
            </button>
            <div className="top-divider"></div>
            <button className="profile" onClick={() => setRole(role === 'Owner' ? 'Admin' : 'Owner')}>
              <div className="avatar">{role === 'Owner' ? 'RA' : 'ST'}</div>
              <div className="profile-info">
                <strong>{role === 'Owner' ? 'Rahayu A.' : 'Staf Gudang'}</strong>
                <small>{role}</small>
              </div>
              <ChevronDown size={15} />
            </button>
          </div>
        </header>

        <div className="page-content">
          {page === 'Dashboard' && (
            <Dashboard
              products={products}
              low={low}
              go={go}
              notify={notify}
              onOpenAddModal={handleOpenAddModal}
              onOpenDetail={(p) => setDetailProduct(p)}
            />
          )}

          {page === 'Produk & Varian' && (
            <Products
              products={filtered}
              rawProducts={products}
              query={query}
              setQuery={setQuery}
              filter={filter}
              setFilter={setFilter}
              filterCat={filterCat}
              setFilterCat={setFilterCat}
              filterMat={filterMat}
              setFilterMat={setFilterMat}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onOpenAddModal={handleOpenAddModal}
              onOpenDetail={(p) => setDetailProduct(p)}
              onOpenEdit={(p) => setEditProduct(p)}
            />
          )}

          {page === 'Barang Masuk' && (
            <StockInPage
              products={products}
              suppliers={suppliers}
              role={role}
              onRecord={recordStockIn}
              notify={notify}
              onGoMutations={() => go('Mutasi Stok')}
            />
          )}

          {page === 'Barang Keluar' && (
            <StockOutPage
              products={products}
              role={role}
              onRecord={recordStockOut}
              notify={notify}
              onGoMutations={() => go('Mutasi Stok')}
            />
          )}

          {page === 'Stock Opname' && (
            <StockOpname
              products={products}
              onConfirmAdjustments={(adjs) => setOpnameConfirmModal(adjs)}
              notify={notify}
            />
          )}

          {page === 'Peringatan Restock' && (
            <Restock
              products={products}
              low={low}
              role={role}
              restockStatusMap={restockStatusMap}
              onRestockAction={handleRestockAction}
              notify={notify}
            />
          )}

          {page === 'Pemasok' && (
            <Suppliers
              suppliers={suppliers}
              products={products}
              onOpenAddSupplier={() => setModal('supplier')}
              onOpenDetail={(sup) => setDetailSupplier(sup)}
              notify={notify}
            />
          )}

          {page === 'Mutasi Stok' && <Mutations mutations={mutations} />}
          {page === 'Laporan' && <Reports products={products} mutations={mutations} notify={notify} />}
          {page === 'Pengguna' && (
            <UsersPage
              role={role}
              setRole={setRole}
              onOpenDetailUser={(u) => setDetailUser(u)}
              notify={notify}
            />
          )}
        </div>

        <footer className="footer">
          <span>© 2026 Sakila Inventory System</span>
          <span><i></i> Prototype frontend lengkap · Baseline SOT Terpenuhi · Data in-memory</span>
        </footer>
      </main>

      {/* Modal Tambah Produk Baru */}
      {modal === 'product' && (
        <div className="modal-backdrop" onClick={() => setModal('')}>
          <form className="modal" onSubmit={addProduct} onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">MASTER DATA</span>
                <h2>Tambah Produk Varian Baru</h2>
                <p>Lengkapi informasi varian kerudung dan batas minimum persediaan.</p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setModal('')} aria-label="Tutup">
                <X size={18} />
              </button>
            </div>

            <div className="form-grid">
              <label className="field full">
                Nama Produk
                <input required name="name" defaultValue="Voal Signature" placeholder="Contoh: Voal Signature" />
              </label>

              <label className="field">
                Jenis Bahan
                <select value={formMaterial} onChange={e => setFormMaterial(e.target.value)}>
                  <option>Voal</option>
                  <option>Ceruty</option>
                  <option>Jersey</option>
                  <option>Paris</option>
                  <option>Babydoll</option>
                  <option>Silk</option>
                </select>
              </label>

              <label className="field">
                Model
                <select value={formModel} onChange={e => setFormModel(e.target.value)}>
                  <option>Segi empat</option>
                  <option>Pashmina</option>
                  <option>Instan</option>
                  <option>Bergo</option>
                </select>
              </label>

              <label className="field">
                Kategori
                <select value={formCategory} onChange={e => setFormCategory(e.target.value)}>
                  <option>Daily Wear</option>
                  <option>Premium</option>
                  <option>Instant</option>
                </select>
              </label>

              <label className="field">
                Pemasok
                <select value={formSupplier} onChange={e => setFormSupplier(e.target.value)}>
                  {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </label>

              <label className="field full">
                Pilihan Warna & Swatch
                <input
                  required
                  value={formColor}
                  onChange={e => setFormColor(e.target.value)}
                  placeholder="Contoh: Sage, Mocca, Cream"
                />
                <div className="swatch-picker">
                  {presetColors.map(c => (
                    <button
                      type="button"
                      key={c.name}
                      className={`swatch-btn ${formColor === c.name ? 'active' : ''}`}
                      style={{ background: c.hex }}
                      title={c.name}
                      onClick={() => { setFormColor(c.name); setFormTone(c.hex); }}
                    />
                  ))}
                </div>
              </label>

              <label className="field full">
                Ukuran
                <input
                  value={formSize}
                  onChange={e => setFormSize(e.target.value)}
                  placeholder="Contoh: 115 × 115 cm"
                />
                <div className="pill-presets">
                  {presetSizes.map(sz => (
                    <button
                      type="button"
                      key={sz}
                      className={`preset-pill ${formSize === sz ? 'active' : ''}`}
                      onClick={() => setFormSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </label>

              <label className="field">
                Stok Awal (Unit)
                <input type="number" min="0" name="stock" defaultValue="25" required />
              </label>

              <label className="field">
                Batas Minimum / Safety Stock
                <input type="number" min="0" name="min" defaultValue="15" required />
              </label>

              <label className="field full">
                Harga Satuan (Rp)
                <input type="number" min="0" name="price" defaultValue="30000" placeholder="Contoh: 28000" required />
              </label>
            </div>

            <div style={{ marginTop: '12px' }}>
              <BarcodeVisual sku={`SKL-${formMaterial.slice(0, 2).toUpperCase()}-${formModel.slice(0, 2).toUpperCase()}-${formColor.slice(0, 3).toUpperCase()}`} />
            </div>

            <div className="modal-foot">
              <button type="button" className="btn btn-secondary" onClick={() => setModal('')}>
                Batal
              </button>
              <button className="btn btn-primary" type="submit">
                <Plus size={16} /> Simpan Produk
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Tambah Pemasok */}
      {modal === 'supplier' && (
        <div className="modal-backdrop" onClick={() => setModal('')}>
          <form className="modal" onSubmit={addSupplier} onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">DIREKTORI MITRA</span>
                <h2>Tambah Pemasok Baru</h2>
                <p>Input identitas dan kontak mitra penyedia bahan kerudung.</p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setModal('')} aria-label="Tutup">
                <X size={18} />
              </button>
            </div>

            <div className="form-grid">
              <label className="field full">
                Nama Perusahaan / Pemasok
                <input required name="name" placeholder="Contoh: PT Silk Nusantara" />
              </label>
              <label className="field full">
                Kategori Bahan Disediakan
                <input required name="categories" placeholder="Contoh: Voal, Silk, Babydoll" />
              </label>
              <label className="field">
                Nomor Telepon / WhatsApp
                <input required name="phone" placeholder="0812-xxxx-xxxx" />
              </label>
              <label className="field">
                Alamat Email
                <input type="email" required name="email" placeholder="kontak@pemasok.id" />
              </label>
              <label className="field full">
                Alamat Kantor / Gudang
                <textarea required name="address" rows="2" placeholder="Alamat lengkap supplier..." />
              </label>
            </div>

            <div className="modal-foot">
              <button type="button" className="btn btn-secondary" onClick={() => setModal('')}>
                Batal
              </button>
              <button className="btn btn-primary" type="submit">
                <Plus size={16} /> Simpan Pemasok
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Detail Produk */}
      {detailProduct && (
        <div className="modal-backdrop" onClick={() => setDetailProduct(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">RINCIAN VARIAN KERUDUNG</span>
                <h2>{detailProduct.name}</h2>
                <p>{detailProduct.variant}</p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setDetailProduct(null)} aria-label="Tutup">
                <X size={18} />
              </button>
            </div>

            <div className="detail-view">
              <div className="detail-top">
                <div className="product-thumb large" style={{ background: detailProduct.tone }}>
                  <span></span>
                </div>
                <div className="detail-meta">
                  <h3>{detailProduct.name}</h3>
                  <p>{detailProduct.variant} · {detailProduct.size}</p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <CategoryBadge category={detailProduct.category} />
                    <Status stock={detailProduct.stock} min={detailProduct.min} />
                  </div>
                </div>
              </div>

              <BarcodeVisual sku={detailProduct.sku} />

              <div className="gauge-box">
                <div className="gauge-label">
                  <span>Rasio Stok terhadap Batas Minimum ({detailProduct.min} unit)</span>
                  <strong>{detailProduct.stock} / {detailProduct.min} unit</strong>
                </div>
                <div className="gauge-track">
                  <div
                    className={`gauge-bar ${detailProduct.stock <= detailProduct.min ? 'low' : 'safe'}`}
                    style={{ width: `${Math.min(100, Math.max(10, (detailProduct.stock / (detailProduct.min * 1.5)) * 100))}%` }}
                  />
                </div>
              </div>

              <div className="detail-grid">
                <div className="detail-cell">
                  <small>Bahan & Model</small>
                  <strong>{detailProduct.material} · {detailProduct.model}</strong>
                </div>
                <div className="detail-cell">
                  <small>Warna / Motif</small>
                  <strong>{detailProduct.color}</strong>
                </div>
                <div className="detail-cell">
                  <small>Pemasok</small>
                  <strong>{detailProduct.supplier}</strong>
                </div>
                <div className="detail-cell">
                  <small>Harga Satuan</small>
                  <strong>{money(detailProduct.price)}</strong>
                </div>
              </div>
            </div>

            <div className="modal-foot">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  const target = detailProduct;
                  setDetailProduct(null);
                  setEditProduct(target);
                }}
              >
                <Edit3 size={15} /> Edit Safety Stock / Harga
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setDetailProduct(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Pemasok */}
      {detailSupplier && (
        <div className="modal-backdrop" onClick={() => setDetailSupplier(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">PROFIL MITRA PEMASOK</span>
                <h2>{detailSupplier.name}</h2>
                <p>Status: {detailSupplier.status}</p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setDetailSupplier(null)} aria-label="Tutup">
                <X size={18} />
              </button>
            </div>

            <div className="supplier-detail-box">
              <div className="supplier-detail-header">
                <div className="supplier-logo" style={{ width: '48px', height: '48px', fontSize: '16px' }}>
                  {detailSupplier.name.split(' ').map(x => x[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <strong>{detailSupplier.name}</strong>
                  <div style={{ color: '#7a8c86', fontSize: '11px', marginTop: '3px' }}>
                    Kategori: {detailSupplier.categories}
                  </div>
                </div>
              </div>

              <div className="supplier-detail-info">
                <div className="detail-cell">
                  <small>No. Telepon / WA</small>
                  <strong>{detailSupplier.phone}</strong>
                </div>
                <div className="detail-cell">
                  <small>Email</small>
                  <strong>{detailSupplier.email}</strong>
                </div>
                <div className="detail-cell" style={{ gridColumn: '1/-1' }}>
                  <small>Alamat Gudang</small>
                  <strong>{detailSupplier.address}</strong>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#203330', marginBottom: '8px' }}>
                Varian yang Disediakan ({products.filter(p => p.supplier === detailSupplier.name).length} SKU):
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {products.filter(p => p.supplier === detailSupplier.name).map(p => (
                  <span key={p.sku} className="preset-pill active">
                    {p.name} ({p.variant})
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-foot">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => notify(`Hubungi ${detailSupplier.phone} (fitur WA gateway disiapkan di tahap backend)`)}
              >
                <Phone size={15} /> Hubungi via WhatsApp
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setDetailSupplier(null)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail User */}
      {detailUser && (
        <div className="modal-backdrop" onClick={() => setDetailUser(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">AKUN PENGGUNA SISTEM</span>
                <h2>{detailUser[0]}</h2>
                <p>{detailUser[1]} · Role: {detailUser[2]}</p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setDetailUser(null)} aria-label="Tutup">
                <X size={18} />
              </button>
            </div>

            <div className="detail-view">
              <div className="detail-cell">
                <small>Nama Lengkap</small>
                <strong>{detailUser[0]}</strong>
              </div>
              <div className="detail-cell">
                <small>Email Resmi</small>
                <strong>{detailUser[1]}</strong>
              </div>
              <div className="detail-cell">
                <small>Hak Akses / Peran</small>
                <span className="role-pill">{detailUser[2]}</span>
              </div>
              <div className="detail-cell">
                <small>Status Akun</small>
                <span className="status status-ok"><i />{detailUser[3]}</span>
              </div>
            </div>

            <p style={{ fontSize: '11px', color: '#7a8c86', lineHeight: '1.6', marginTop: '14px' }}>
              Autentikasi sesungguhnya, hash kata sandi, dan proteksi middleware akan diimplementasikan pada backend Laravel di tahap berikutnya.
            </p>

            <div className="modal-foot">
              <button type="button" className="btn btn-primary" onClick={() => setDetailUser(null)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Produk (Safety Stock, Price, Supplier) */}
      {editProduct && (
        <div className="modal-backdrop" onClick={() => setEditProduct(null)}>
          <form className="modal" onSubmit={handleSaveEditProduct} onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">PENGATURAN PARAMETER</span>
                <h2>Sesuaikan Batas Minimum & Harga</h2>
                <p>{editProduct.name} ({editProduct.sku})</p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setEditProduct(null)} aria-label="Tutup">
                <X size={18} />
              </button>
            </div>

            <div className="form-grid">
              <label className="field full">
                Batas Minimum Stok (Safety Stock)
                <input
                  type="number"
                  min="0"
                  name="min"
                  defaultValue={editProduct.min}
                  required
                />
              </label>

              <label className="field full">
                Harga Satuan (Rp)
                <input
                  type="number"
                  min="0"
                  name="price"
                  defaultValue={editProduct.price}
                  required
                />
              </label>

              <label className="field full">
                Pemasok Terdaftar
                <select name="supplier" defaultValue={editProduct.supplier}>
                  {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </label>
            </div>

            <div className="modal-foot">
              <button type="button" className="btn btn-secondary" onClick={() => setEditProduct(null)}>
                Batal
              </button>
              <button className="btn btn-primary" type="submit">
                <Check size={16} /> Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Konfirmasi Penyesuaian Stock Opname */}
      {opnameConfirmModal && (
        <div className="modal-backdrop" onClick={() => setOpnameConfirmModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">KONFIRMASI REKONSILIASI</span>
                <h2>Terapkan Penyesuaian Stok Fisik</h2>
                <p>Penyesuaian akan disinkronkan ke stok sistem dan dicatat ke mutasi.</p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setOpnameConfirmModal(null)} aria-label="Tutup">
                <X size={18} />
              </button>
            </div>

            <div className="adjustment-summary-box">
              <strong>Daftar Varian yang Akan Disesuaikan ({opnameConfirmModal.length} item):</strong>
              <ul>
                {opnameConfirmModal.map((adj) => (
                  <li key={adj.sku}>
                    <strong>{adj.name}</strong> ({adj.sku}): Sistem {adj.system} unit ➔ Fisik {adj.physical} unit
                    {' '}(<span className={adj.diff < 0 ? 'negative' : 'positive'}>{adj.diff > 0 ? '+' : ''}{adj.diff}</span>)
                    <br /><small style={{ color: '#7a8c86' }}>Alasan: {adj.reason}</small>
                  </li>
                ))}
              </ul>
            </div>

            <p style={{ fontSize: '11px', color: '#7a8c86', lineHeight: '1.5' }}>
              Pencatatan ini tidak menghapus riwayat sebelumnya dan akan mencantumkan petugas aktif:{' '}
              <strong>{role === 'Owner' ? 'Rahayu A. (Owner)' : 'Staf Gudang (Admin)'}</strong>.
            </p>

            <div className="modal-foot">
              <button type="button" className="btn btn-secondary" onClick={() => setOpnameConfirmModal(null)}>
                Batal
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => applyOpnameAdjustments(opnameConfirmModal)}
              >
                <Check size={16} /> Konfirmasi & Terapkan
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}

function PageHeading({ eyebrow, title, desc, action, icon: Icon = Plus, onAction }) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      {action && (
        <button className="btn btn-primary" onClick={onAction}>
          {Icon && <Icon size={16} />} {action}
        </button>
      )}
    </div>
  );
}

function Stat({ label, value, sub, icon: Icon, tone = 'teal', trend }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon size={19} strokeWidth={1.8} />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-foot">
        {trend && (
          <span className={`trend ${trend.startsWith('-') ? 'down' : ''}`}>
            <ArrowUpRight size={13} />
            {trend}
          </span>
        )}
        <span>{sub}</span>
      </div>
    </div>
  );
}

function Dashboard({ products, low, go, notify, onOpenAddModal, onOpenDetail }) {
  const total = products.reduce((s, p) => s + p.stock, 0);
  const totalValue = products.reduce((s, p) => s + p.stock * p.price, 0);

  const categories = useMemo(() => {
    const map = {};
    products.forEach(p => {
      map[p.category] = (map[p.category] || 0) + p.stock;
    });
    return map;
  }, [products]);

  return (
    <>
      <PageHeading
        eyebrow="RINGKASAN INVENTARIS"
        title="Selamat datang kembali 👋"
        desc="Berikut ringkasan kondisi persediaan Toko Hijab Sakila hari ini."
        action="Tambah produk baru"
        icon={Plus}
        onAction={onOpenAddModal}
      />

      <div className="date-chip">
        <CalendarDays size={15} /> Kamis, 23 Oktober 2026 <span>•</span> Data demo aktif (Sprint 3 & 4 Selesai)
      </div>

      <div className="stats-grid">
        <Stat
          label="Total unit stok"
          value={total.toLocaleString('id-ID')}
          sub="Unit dari semua varian"
          icon={Boxes}
          tone="teal"
          trend="8,2%"
        />
        <Stat
          label="Varian terdaftar"
          value={products.length.toString().padStart(2, '0')}
          sub="SKU terdaftar"
          icon={Package}
          tone="blue"
          trend="+1 varian"
        />
        <Stat
          label="Stok menipis"
          value={low.length.toString().padStart(2, '0')}
          sub="Perlu ditindaklanjuti"
          icon={AlertTriangle}
          tone="amber"
        />
        <Stat
          label="Estimasi nilai persediaan"
          value={money(totalValue)}
          sub="Berdasarkan harga satuan"
          icon={ShoppingBasket}
          tone="purple"
        />
      </div>

      {/* Quick Action Navigation */}
      <div className="quick-dash-actions">
        <div className="quick-dash-card" onClick={onOpenAddModal}>
          <div className="icon-wrap" style={{ background: '#eaf5f1', color: '#167d72' }}>
            <Plus size={18} />
          </div>
          <div>
            <strong>Tambah Produk Baru</strong>
            <span>Input varian & safety stock</span>
          </div>
        </div>
        <div className="quick-dash-card" onClick={() => go('Barang Masuk')}>
          <div className="icon-wrap" style={{ background: '#e8f6f0', color: '#228876' }}>
            <ArrowDownToLine size={18} />
          </div>
          <div>
            <strong>Catat Barang Masuk</strong>
            <span>Penerimaan faktur / pemasok</span>
          </div>
        </div>
        <div className="quick-dash-card" onClick={() => go('Barang Keluar')}>
          <div className="icon-wrap" style={{ background: '#fff1e8', color: '#d48656' }}>
            <ArrowUpFromLine size={18} />
          </div>
          <div>
            <strong>Catat Barang Keluar</strong>
            <span>Penjualan harian & retur</span>
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="category-summary-strip">
        <div className="category-summary-card">
          <div>
            <small>Kategori Daily Wear</small>
            <strong>{categories['Daily Wear'] || 0} unit</strong>
          </div>
          <span className="badge-category daily">Daily Wear</span>
        </div>
        <div className="category-summary-card">
          <div>
            <small>Kategori Premium</small>
            <strong>{categories['Premium'] || 0} unit</strong>
          </div>
          <span className="badge-category premium">Premium</span>
        </div>
        <div className="category-summary-card">
          <div>
            <small>Kategori Instant</small>
            <strong>{categories['Instant'] || 0} unit</strong>
          </div>
          <span className="badge-category instant">Instant</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <h3>Pergerakan stok</h3>
              <p>Aktivitas barang masuk dan keluar selama 7 hari</p>
            </div>
            <button className="select-small" onClick={() => notify('Rentang tanggal demo: 7 hari terakhir')}>
              7 hari terakhir <ChevronDown size={14} />
            </button>
          </div>
          <div className="chart-legend">
            <span><i className="legend-dot masuk"></i>Barang masuk</span>
            <span><i className="legend-dot keluar"></i>Barang keluar</span>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#258e7e" stopOpacity={0.17} />
                    <stop offset="95%" stopColor="#258e7e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8aa8d9" stopOpacity={0.16} />
                    <stop offset="95%" stopColor="#8aa8d9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 5" vertical={false} stroke="#edf1ef" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#879491', fontSize: 11 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#879491', fontSize: 11 }} />
                <Tooltip contentStyle={{ border: '1px solid #e7edeb', borderRadius: 12, fontSize: 12, boxShadow: '0 8px 24px #172b2a0a' }} />
                <Area type="monotone" dataKey="masuk" name="Barang masuk" stroke="#258e7e" strokeWidth={2.5} fill="url(#fillIn)" />
                <Area type="monotone" dataKey="keluar" name="Barang keluar" stroke="#8aa8d9" strokeWidth={2.5} fill="url(#fillOut)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel alert-panel">
          <div className="panel-heading">
            <div>
              <h3>Perlu restock <span className="tiny-count">{low.length}</span></h3>
              <p>Varian di bawah batas minimum</p>
            </div>
            <button className="text-link" onClick={() => go('Peringatan Restock')}>
              Lihat semua <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="alert-list">
            {low.slice(0, 4).map(p => (
              <div className="alert-row" key={p.sku} onClick={() => onOpenDetail(p)} style={{ cursor: 'pointer' }}>
                <div className="product-thumb" style={{ background: p.tone }}><span></span></div>
                <div className="alert-product">
                  <strong>{p.name}</strong>
                  <small>{p.variant}</small>
                  <div className="stock-track">
                    <span style={{ width: `${Math.max(8, (p.stock / p.min) * 100)}%` }}></span>
                  </div>
                </div>
                <div className="alert-qty">
                  <strong>{p.stock} <small>unit</small></strong>
                  <span>Min. {p.min}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-soft full-btn" onClick={() => go('Peringatan Restock')}>
            Kelola kebutuhan restock <ArrowUpRight size={15} />
          </button>
        </section>
      </div>

      <section className="panel table-panel">
        <div className="panel-heading">
          <div>
            <h3>Produk terbaru</h3>
            <p>Ringkasan persediaan per varian</p>
          </div>
          <button className="text-link" onClick={() => go('Produk & Varian')}>
            Lihat katalog lengkap <ArrowUpRight size={14} />
          </button>
        </div>
        <ProductTable products={products.slice(0, 6)} onOpenDetail={onOpenDetail} />
      </section>
    </>
  );
}

function ProductTable({ products, onOpenDetail, onOpenEdit }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>PRODUK</th>
            <th>SKU</th>
            <th>KATEGORI</th>
            <th>BAHAN & MODEL</th>
            <th>STOK</th>
            <th>BATAS MIN.</th>
            <th>STATUS</th>
            <th>HARGA</th>
            {onOpenDetail && <th>AKSI</th>}
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.sku}>
              <td>
                <div className="table-product">
                  <div className="product-thumb small" style={{ background: p.tone }}><span></span></div>
                  <div>
                    <strong>{p.name}</strong>
                    <small>{p.variant}</small>
                  </div>
                </div>
              </td>
              <td><code>{p.sku}</code></td>
              <td><CategoryBadge category={p.category} /></td>
              <td>{p.material} · {p.model}</td>
              <td><strong>{p.stock}</strong> <span className="muted">unit</span></td>
              <td>{p.min} unit</td>
              <td><Status stock={p.stock} min={p.min} /></td>
              <td>{money(p.price)}</td>
              {onOpenDetail && (
                <td>
                  <div className="action-cell">
                    <button
                      className="icon-btn"
                      onClick={() => onOpenDetail(p)}
                      title="Lihat rincian varian & barcode"
                    >
                      <Eye size={15} />
                    </button>
                    {onOpenEdit && (
                      <button
                        className="icon-btn"
                        onClick={() => onOpenEdit(p)}
                        title="Edit safety stock & harga"
                      >
                        <Edit3 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (
        <div className="empty-state">Produk tidak ditemukan. Coba kata kunci atau reset filter.</div>
      )}
    </div>
  );
}

function Status({ stock, min }) {
  return stock <= min ? (
    <span className="status status-low"><i />Stok menipis</span>
  ) : (
    <span className="status status-ok"><i />Stok aman</span>
  );
}

function Products({
  products,
  rawProducts,
  query,
  setQuery,
  filter,
  setFilter,
  filterCat,
  setFilterCat,
  filterMat,
  setFilterMat,
  sortBy,
  setSortBy,
  onOpenAddModal,
  onOpenDetail,
  onOpenEdit
}) {
  const safeCount = rawProducts.filter(p => p.stock > p.min).length;
  const lowCount = rawProducts.filter(p => p.stock <= p.min).length;

  return (
    <>
      <PageHeading
        eyebrow="KATALOG INVENTARIS"
        title="Produk & Varian"
        desc="Kelola katalog kerudung, SKU, representasi barcode, atribut varian, dan batas minimum stok."
        action="Tambah produk baru"
        onAction={onOpenAddModal}
      />

      <div className="stats-strip">
        <div>
          <Package size={17} />
          <span>Total SKU</span>
          <strong>{rawProducts.length}</strong>
        </div>
        <div>
          <CheckCircle2 size={17} />
          <span>Stok aman</span>
          <strong>{safeCount}</strong>
        </div>
        <div>
          <AlertTriangle size={17} />
          <span>Stok menipis</span>
          <strong>{lowCount}</strong>
        </div>
      </div>

      <section className="panel table-panel">
        <div className="toolbar">
          <div className="search-field">
            <Search size={16} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari nama, SKU, bahan, warna, pemasok..."
            />
          </div>

          <div className="toolbar-actions">
            <select
              className="filter-select"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              title="Filter status stok"
            >
              <option value="Semua">Semua Status</option>
              <option value="Stok menipis">Stok menipis</option>
              <option value="Stok aman">Stok aman</option>
            </select>

            <select
              className="filter-select"
              value={filterCat}
              onChange={e => setFilterCat(e.target.value)}
              title="Filter kategori produk"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Daily Wear">Daily Wear</option>
              <option value="Premium">Premium</option>
              <option value="Instant">Instant</option>
            </select>

            <select
              className="filter-select"
              value={filterMat}
              onChange={e => setFilterMat(e.target.value)}
              title="Filter bahan kerudung"
            >
              <option value="Semua">Semua Bahan</option>
              <option value="Voal">Voal</option>
              <option value="Ceruty">Ceruty</option>
              <option value="Jersey">Jersey</option>
              <option value="Paris">Paris</option>
            </select>

            <select
              className="filter-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              title="Urutkan data"
            >
              <option value="name-asc">Nama (A-Z)</option>
              <option value="stock-asc">Stok terendah</option>
              <option value="stock-desc">Stok tertinggi</option>
              <option value="price-desc">Harga tertinggi</option>
            </select>

            <button
              className="btn btn-secondary"
              onClick={() => {
                setFilter('Semua');
                setFilterCat('Semua');
                setFilterMat('Semua');
                setSortBy('name-asc');
                setQuery('');
              }}
              title="Reset seluruh filter"
            >
              <SlidersHorizontal size={15} /> Reset
            </button>

            <button
              className="icon-btn"
              onClick={() => {
                const blob = new Blob([
                  [
                    'SKU,Nama,Varian,Kategori,Bahan,Warna,Ukuran,Stok,Minimum,Harga,Pemasok',
                    ...products.map(p =>
                      [p.sku, p.name, p.variant, p.category, p.material, p.color, p.size, p.stock, p.min, p.price, p.supplier].join(',')
                    )
                  ].join('\n')
                ], { type: 'text/csv' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'katalog-produk-sakila.csv';
                a.click();
                URL.revokeObjectURL(a.href);
              }}
              title="Ekspor CSV Katalog"
            >
              <Download size={16} />
            </button>
          </div>
        </div>

        <ProductTable
          products={products}
          onOpenDetail={onOpenDetail}
          onOpenEdit={onOpenEdit}
        />

        <div className="table-bottom">
          <span>Menampilkan <strong>{products.length}</strong> varian produk</span>
          <span>Data in-memory prototype · Terintegrasi ke modul transaksi</span>
        </div>
      </section>
    </>
  );
}

// Halaman Barang Masuk
function StockInPage({ products, suppliers, role, onRecord, notify, onGoMutations }) {
  const [selected, setSelected] = useState(products[0]?.sku || '');
  const [qty, setQty] = useState(10);
  const [ref, setRef] = useState('');
  const [supplier, setSupplier] = useState(suppliers[0]?.name || 'CV Berkah Textile');
  const [note, setNote] = useState('');

  const currentProd = products.find(x => x.sku === selected) || products[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentProd || qty < 1) {
      notify('Kuantitas barang masuk minimal 1 unit');
      return;
    }
    onRecord({
      sku: currentProd.sku,
      qty,
      ref: ref.trim(),
      supplier,
      note: note.trim()
    });
    setRef('');
    setNote('');
  };

  return (
    <>
      <PageHeading
        eyebrow="OPERASIONAL INVENTARIS"
        title="Barang Masuk"
        desc="Catat penerimaan kerudung dari pemasok, referensi faktur/surat jalan, dan perbarui stok secara konsisten."
        action="Riwayat mutasi"
        icon={Clock3}
        onAction={onGoMutations}
      />

      <div className="operation-grid">
        <section className="panel operation-form">
          <div className="form-title">
            <div className="large-icon mint">
              <ArrowDownToLine size={21} />
            </div>
            <div>
              <h3>Pencatatan Barang Masuk</h3>
              <p>Stok akan bertambah setelah transaksi dikonfirmasi.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="field">
              Pilih Varian Kerudung
              <div className="select-wrap">
                <select value={selected} onChange={e => setSelected(e.target.value)}>
                  {products.map(p => (
                    <option key={p.sku} value={p.sku}>
                      {p.name} — {p.variant} (Stok: {p.stock} unit)
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label className="field">
              Pemasok
              <select value={supplier} onChange={e => setSupplier(e.target.value)}>
                {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </label>

            <label className="field">
              Jumlah Unit Diterima
              <input
                type="number"
                min="1"
                value={qty}
                onChange={e => setQty(Math.max(1, Number(e.target.value)))}
                required
              />
            </label>

            <label className="field">
              Nomor Faktur / Surat Jalan
              <input
                value={ref}
                onChange={e => setRef(e.target.value)}
                placeholder="Contoh: INV-2026-009 (otomatis jika kosong)"
              />
            </label>

            <label className="field">
              Catatan Penerimaan
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Kondisi pengiriman atau keterangan faktur..."
                rows="2"
              />
            </label>

            <div className="info-note">
              <AlertTriangle size={16} />
              <span>
                Petugas pencatat:{' '}
                <strong>{role === 'Owner' ? 'Rahayu A. (Owner)' : 'Staf Gudang (Admin)'}</strong>.
                Transaksi langsung memperbarui stok sistem dan tercatat di mutasi.
              </span>
            </div>

            <button className="btn btn-primary full-btn" type="submit">
              <Check size={16} /> Konfirmasi Penerimaan Barang Masuk
            </button>
          </form>
        </section>

        <section className="panel side-info">
          <div className="panel-heading">
            <div>
              <h3>Ringkasan Transaksi</h3>
              <p>Periksa sebelum konfirmasi</p>
            </div>
            <ScanBarcode size={19} className="muted-icon" />
          </div>

          {currentProd && (
            <>
              <div className="preview-product">
                <div className="product-thumb large" style={{ background: currentProd.tone }}>
                  <span></span>
                </div>
                <div>
                  <strong>{currentProd.name}</strong>
                  <p>{currentProd.variant}</p>
                  <code>{currentProd.sku}</code>
                </div>
              </div>

              <div className="summary-lines">
                <div><span>Stok saat ini</span><strong>{currentProd.stock} unit</strong></div>
                <div><span>Jumlah masuk</span><strong className="positive">+{qty} unit</strong></div>
                <div className="summary-result">
                  <span>Stok setelah transaksi</span>
                  <strong>{currentProd.stock + qty} unit</strong>
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <Status stock={currentProd.stock + qty} min={currentProd.min} />
              </div>
            </>
          )}

          <div className="side-tip">
            <strong><ScanBarcode size={15} /> Tips Operasional</strong>
            <p>Pastikan nomor faktur dan kuantitas fisik sesuai dengan surat jalan dari pemasok sebelum konfirmasi.</p>
          </div>
        </section>
      </div>
    </>
  );
}

// Halaman Barang Keluar
function StockOutPage({ products, role, onRecord, notify, onGoMutations }) {
  const [selected, setSelected] = useState(products[0]?.sku || '');
  const [qty, setQty] = useState(1);
  const [ref, setRef] = useState('');
  const [outType, setOutType] = useState('Penjualan harian');
  const [note, setNote] = useState('');

  const currentProd = products.find(x => x.sku === selected) || products[0];
  const isOverStock = currentProd ? qty > currentProd.stock : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentProd || qty < 1) {
      notify('Kuantitas barang keluar minimal 1 unit');
      return;
    }
    const success = onRecord({
      sku: currentProd.sku,
      qty,
      ref: ref.trim(),
      outType,
      note: note.trim()
    });
    if (success) {
      setRef('');
      setNote('');
    }
  };

  return (
    <>
      <PageHeading
        eyebrow="OPERASIONAL INVENTARIS"
        title="Barang Keluar"
        desc="Catat persediaan keluar untuk penjualan toko harian atau retur barang cacat, dengan validasi stok tidak boleh minus."
        action="Riwayat mutasi"
        icon={Clock3}
        onAction={onGoMutations}
      />

      <div className="operation-grid">
        <section className="panel operation-form">
          <div className="form-title">
            <div className="large-icon peach">
              <ArrowUpFromLine size={21} />
            </div>
            <div>
              <h3>Pencatatan Barang Keluar</h3>
              <p>Validasi ketersediaan stok fisik secara real-time.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="field">
              Jenis Pengeluaran
              <div className="type-toggle-group">
                <button
                  type="button"
                  className={`type-toggle-btn ${outType === 'Penjualan harian' ? 'active' : ''}`}
                  onClick={() => setOutType('Penjualan harian')}
                >
                  <ShoppingBasket size={15} /> Penjualan Toko
                </button>
                <button
                  type="button"
                  className={`type-toggle-btn ${outType === 'Retur barang cacat' ? 'danger-active' : ''}`}
                  onClick={() => setOutType('Retur barang cacat')}
                >
                  <AlertTriangle size={15} /> Retur Cacat / Rusak
                </button>
              </div>
            </label>

            <label className="field">
              Pilih Varian Kerudung
              <div className="select-wrap">
                <select value={selected} onChange={e => setSelected(e.target.value)}>
                  {products.map(p => (
                    <option key={p.sku} value={p.sku}>
                      {p.name} — {p.variant} (Tersedia: {p.stock} unit)
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label className="field">
              Jumlah Unit Dikeluarkan
              <input
                type="number"
                min="1"
                max={currentProd?.stock || 999}
                value={qty}
                onChange={e => setQty(Math.max(1, Number(e.target.value)))}
                required
              />
            </label>

            <label className="field">
              {outType === 'Penjualan harian' ? 'Nomor Transaksi / Struk Kasir' : 'Nomor Berita Acara / Retur'}
              <input
                value={ref}
                onChange={e => setRef(e.target.value)}
                placeholder={outType === 'Penjualan harian' ? 'Contoh: TRX-2026-042 (otomatis jika kosong)' : 'Contoh: RET-2026-004'}
              />
            </label>

            <label className="field">
              Catatan Tambahan
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder={outType === 'Penjualan harian' ? 'Catatan penjualan khusus pelanggan...' : 'Keterangan kerusakan kerudung...'}
                rows="2"
              />
            </label>

            {isOverStock ? (
              <div className="info-note" style={{ background: '#fff0ed', color: '#cf7954' }}>
                <XCircle size={16} />
                <span>
                  <strong>Peringatan Validasi:</strong> Jumlah pengeluaran ({qty} unit) melebihi stok yang ada ({currentProd?.stock} unit).
                  Stok tidak boleh bernilai negatif!
                </span>
              </div>
            ) : (
              <div className="info-note">
                <AlertTriangle size={16} />
                <span>
                  Petugas:{' '}
                  <strong>{role === 'Owner' ? 'Rahayu A. (Owner)' : 'Staf Gudang (Admin)'}</strong>.
                  Stok akan berkurang otomatis dan log tersimpan di audit mutasi.
                </span>
              </div>
            )}

            <button
              className="btn btn-primary full-btn"
              type="submit"
              disabled={isOverStock}
              style={isOverStock ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              <Check size={16} /> Konfirmasi Pengeluaran Barang
            </button>
          </form>
        </section>

        <section className="panel side-info">
          <div className="panel-heading">
            <div>
              <h3>Ringkasan Transaksi</h3>
              <p>Periksa sebelum konfirmasi</p>
            </div>
            <ScanBarcode size={19} className="muted-icon" />
          </div>

          {currentProd && (
            <>
              <div className="preview-product">
                <div className="product-thumb large" style={{ background: currentProd.tone }}>
                  <span></span>
                </div>
                <div>
                  <strong>{currentProd.name}</strong>
                  <p>{currentProd.variant}</p>
                  <code>{currentProd.sku}</code>
                </div>
              </div>

              <div className="summary-lines">
                <div><span>Stok saat ini</span><strong>{currentProd.stock} unit</strong></div>
                <div><span>Jumlah keluar</span><strong className="negative">−{qty} unit</strong></div>
                <div className="summary-result">
                  <span>Sisa stok setelah transaksi</span>
                  <strong className={isOverStock ? 'negative' : ''}>
                    {Math.max(0, currentProd.stock - qty)} unit
                  </strong>
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <Status stock={Math.max(0, currentProd.stock - qty)} min={currentProd.min} />
              </div>
            </>
          )}

          <div className="side-tip">
            <strong><ScanBarcode size={15} /> Aturan Keamanan Stok</strong>
            <p>Sistem menolak transaksi keluar jika kuantitas melebihi stok tersedia untuk mencegah stok negatif.</p>
          </div>
        </section>
      </div>
    </>
  );
}

// Halaman Stock Opname dengan Adjustment
function StockOpname({ products, onConfirmAdjustments, notify }) {
  const [counts, setCounts] = useState(Object.fromEntries(products.map(p => [p.sku, p.stock])));
  const [reasons, setReasons] = useState(
    Object.fromEntries(products.map(p => [p.sku, 'Sesuai hitung fisik']))
  );

  const pendingAdjustments = useMemo(() => {
    return products
      .map(p => {
        const physical = Number(counts[p.sku] ?? p.stock);
        const diff = physical - p.stock;
        return {
          sku: p.sku,
          name: p.name,
          variant: p.variant,
          tone: p.tone,
          system: p.stock,
          physical,
          diff,
          reason: reasons[p.sku] || (diff < 0 ? 'Selisih kurang' : 'Selisih lebih')
        };
      })
      .filter(item => item.diff !== 0);
  }, [products, counts, reasons]);

  const handleApply = () => {
    if (pendingAdjustments.length === 0) {
      notify('Semua stok fisik saat ini sesuai dengan catatan sistem.');
      return;
    }
    onConfirmAdjustments(pendingAdjustments);
  };

  return (
    <>
      <PageHeading
        eyebrow="REKONSILIASI INVENTARIS"
        title="Stock Opname"
        desc="Bandingkan jumlah stok fisik dengan catatan sistem, dokumentasikan alasan selisih, dan terapkan penyesuaian (adjustment)."
        action="Terapkan Penyesuaian"
        icon={Check}
        onAction={handleApply}
      />

      <div className="notice-banner">
        <div><RefreshCw size={19} /></div>
        <p>
          <strong>Mode Pemeriksaan Fisik & Penyesuaian</strong><br />
          Ubah angka stok fisik jika ada ketidaksesuaian. Selisih akan dikalkulasi otomatis dan Anda dapat
          menerapkan penyesuaian resmi ke database in-memory tanpa menghapus riwayat audit.
        </p>
        <span className="status status-neutral">
          {pendingAdjustments.length > 0 ? `${pendingAdjustments.length} Perlu Penyesuaian` : 'Selaras'}
        </span>
      </div>

      <section className="panel table-panel">
        <div className="panel-heading">
          <div>
            <h3>Daftar Pemeriksaan ({products.length} varian)</h3>
            <p>Masukkan hasil hitung fisik dan keterangan selisih jika ada.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setCounts(Object.fromEntries(products.map(p => [p.sku, p.stock])));
                setReasons(Object.fromEntries(products.map(p => [p.sku, 'Sesuai hitung fisik'])));
                notify('Hasil hitung fisik telah direset ke stok sistem');
              }}
            >
              Reset Hitung
            </button>
            <button
              className="btn btn-primary"
              onClick={handleApply}
            >
              <Check size={16} /> Terapkan Penyesuaian ({pendingAdjustments.length})
            </button>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>PRODUK</th>
                <th>STOK SISTEM</th>
                <th>STOK FISIK</th>
                <th>SELISIH</th>
                <th>ALASAN SELISIH / KETERANGAN</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => {
                const physicalVal = counts[p.sku] ?? p.stock;
                const diff = Number(physicalVal) - p.stock;
                return (
                  <tr key={p.sku}>
                    <td>
                      <div className="table-product">
                        <div className="product-thumb small" style={{ background: p.tone }}><span /></div>
                        <div>
                          <strong>{p.name}</strong>
                          <small>{p.variant}</small>
                        </div>
                      </div>
                    </td>
                    <td>{p.stock} unit</td>
                    <td>
                      <input
                        className="inline-number"
                        type="number"
                        min="0"
                        value={physicalVal}
                        onChange={e => setCounts({ ...counts, [p.sku]: e.target.value })}
                      />
                    </td>
                    <td>
                      <strong className={diff < 0 ? 'negative' : diff > 0 ? 'positive' : ''}>
                        {diff > 0 ? '+' : ''}{diff} unit
                      </strong>
                    </td>
                    <td>
                      <input
                        className="opname-reason-input"
                        placeholder={diff === 0 ? 'Sesuai hitung fisik' : 'Contoh: 2 unit sobek / salah input'}
                        value={reasons[p.sku] ?? ''}
                        onChange={e => setReasons({ ...reasons, [p.sku]: e.target.value })}
                      />
                    </td>
                    <td>
                      {diff === 0 ? (
                        <span className="status status-ok"><i />Sesuai</span>
                      ) : (
                        <span className="status status-low"><i />Perlu penyesuaian</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="table-bottom">
          <span>
            {pendingAdjustments.length > 0 ? (
              <span className="negative">
                Ada <strong>{pendingAdjustments.length}</strong> varian dengan selisih yang siap disesuaikan.
              </span>
            ) : (
              <span>Semua varian sesuai dengan catatan fisik.</span>
            )}
          </span>
          <span>Sesuai standar audit SOT</span>
        </div>
      </section>
    </>
  );
}

// Halaman Mutasi Stok Kronologis
function Mutations({ mutations }) {
  const [filterType, setFilterType] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return mutations.filter(m => {
      const matchType = filterType === 'Semua' || m.type === filterType;
      const matchSearch =
        (m.product + ' ' + m.sku + ' ' + m.ref + ' ' + m.officer + ' ' + (m.note || ''))
          .toLowerCase()
          .includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [mutations, filterType, search]);

  const handleExportCSV = () => {
    const header = 'ID,Waktu,Jenis,Produk,SKU,Perubahan,Petugas,Referensi,Catatan';
    const rows = filtered.map(m =>
      [m.id, m.time, m.type, m.product, m.sku, m.delta > 0 ? `+${m.delta}` : `${m.delta}`, m.officer, m.ref, m.note || ''].join(',')
    );
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `mutasi-stok-sakila-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <>
      <PageHeading
        eyebrow="AUDIT INVENTARIS"
        title="Mutasi Stok"
        desc="Riwayat kronologis seluruh transaksi barang masuk, keluar, dan penyesuaian stok opname."
        action="Ekspor mutasi (CSV)"
        icon={Download}
        onAction={handleExportCSV}
      />

      <section className="panel table-panel">
        <div className="toolbar">
          <div className="search-field">
            <Search size={16} />
            <input
              placeholder="Cari produk, SKU, referensi, petugas..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="toolbar-actions">
            <select
              className="filter-select"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              title="Filter jenis mutasi"
            >
              <option value="Semua">Semua Jenis Transaksi</option>
              <option value="Barang masuk">Barang masuk</option>
              <option value="Barang keluar">Barang keluar</option>
              <option value="Penyesuaian stok">Penyesuaian stok</option>
            </select>

            <button
              className="btn btn-secondary"
              onClick={() => { setFilterType('Semua'); setSearch(''); }}
            >
              <SlidersHorizontal size={15} /> Reset
            </button>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>WAKTU & ID</th>
                <th>JENIS TRANSAKSI</th>
                <th>PRODUK & SKU</th>
                <th>PERUBAHAN</th>
                <th>PETUGAS</th>
                <th>REFERENSI</th>
                <th>CATATAN</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id}>
                  <td>
                    <strong>{m.time}</strong>
                    <br /><small style={{ color: '#8d9c97' }}>{m.id}</small>
                  </td>
                  <td>
                    <span className={`mutation-type-badge ${m.type === 'Barang masuk' ? 'in' : m.type === 'Barang keluar' ? 'out' : 'adjust'}`}>
                      {m.type === 'Barang masuk' ? <ArrowDownToLine size={13} /> : m.type === 'Barang keluar' ? <ArrowUpFromLine size={13} /> : <RefreshCw size={13} />}
                      {m.type}
                    </span>
                    {m.subType && (
                      <small style={{ display: 'block', color: '#889893', marginTop: '3px' }}>
                        {m.subType}
                      </small>
                    )}
                  </td>
                  <td>
                    <strong>{m.product}</strong>
                    <br /><code>{m.sku}</code>
                  </td>
                  <td>
                    <strong className={m.delta > 0 ? 'positive' : 'negative'} style={{ fontSize: '13px' }}>
                      {m.delta > 0 ? `+${m.delta}` : m.delta} unit
                    </strong>
                  </td>
                  <td>
                    <span className="officer-tag">
                      <UserCheck size={12} /> {m.officer}
                    </span>
                  </td>
                  <td><code>{m.ref}</code></td>
                  <td><small style={{ color: '#667973' }}>{m.note || '—'}</small></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="empty-state">Belum ada riwayat mutasi yang cocok dengan kriteria pencarian.</div>
          )}
        </div>

        <div className="table-bottom">
          <span>Menampilkan <strong>{filtered.length}</strong> transaksi mutasi stok</span>
          <span>Audit in-memory prototype · Terhubung ke transaksi riil</span>
        </div>
      </section>
    </>
  );
}

// Sprint 3: Halaman Peringatan Restock & Siklus Persetujuan
function Restock({ products, low, role, restockStatusMap, onRestockAction, notify }) {
  const [filterRestock, setFilterRestock] = useState('Semua');

  const filteredItems = useMemo(() => {
    return low.filter(p => {
      const currentStatus = restockStatusMap[p.sku] || 'suggested';
      if (filterRestock === 'Semua') return true;
      if (filterRestock === 'Perlu Pengajuan') return currentStatus === 'suggested';
      if (filterRestock === 'Menunggu Persetujuan') return currentStatus === 'pending';
      if (filterRestock === 'Disetujui') return currentStatus === 'approved';
      return true;
    });
  }, [low, restockStatusMap, filterRestock]);

  const handleExportCSV = () => {
    const header = 'SKU,Nama,Varian,Stok,BatasMinimum,RekomendasiPesan,Pemasok,Prioritas,Status';
    const rows = low.map(p => {
      const rec = Math.max(p.min * 2 - p.stock, p.min);
      const prio = p.stock <= p.min / 2 ? 'Tinggi' : 'Sedang';
      const st = restockStatusMap[p.sku] || 'suggested';
      return [p.sku, p.name, p.variant, p.stock, p.min, rec, p.supplier, prio, st].join(',');
    });
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `rekomendasi-restock-sakila-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <>
      <PageHeading
        eyebrow="PENGENDALIAN STOK & PENGADAAN"
        title="Peringatan Restock"
        desc="Deteksi varian kritis secara otomatis (stok <= safety stock), kalkulasi kuantitas rekomendasi, dan kelola alur persetujuan Owner."
        action="Ekspor Kebutuhan Restock"
        icon={Download}
        onAction={handleExportCSV}
      />

      <div className="restock-summary">
        <div className="restock-summary-icon"><BellRing size={20} /></div>
        <div>
          <strong>{low.length} varian terdeteksi di bawah batas minimum (Safety Stock)</strong>
          <p>
            Rekomendasi kuantitas pengadaan dihitung memakai rumus baku SOT:{' '}
            <code>max(2 × safety_stock − stock_on_hand, safety_stock)</code>.
          </p>
        </div>
        <span className="status status-low">
          {low.length > 0 ? `${low.length} Perlu Tindakan` : 'Stok Aman'}
        </span>
      </div>

      <section className="panel table-panel">
        <div className="toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#445651' }}>Filter Status Pengajuan:</span>
            <select
              className="filter-select"
              value={filterRestock}
              onChange={e => setFilterRestock(e.target.value)}
            >
              <option value="Semua">Semua Kebutuhan Restock</option>
              <option value="Perlu Pengajuan">Perlu Pengajuan (Suggested)</option>
              <option value="Menunggu Persetujuan">Menunggu Persetujuan Owner</option>
              <option value="Disetujui">Disetujui (Approved)</option>
            </select>
          </div>

          <div style={{ fontSize: '11px', color: '#7a8c86' }}>
            Role Aktif: <strong>{role === 'Owner' ? 'Owner (Bisa Menyetujui)' : 'Admin (Bisa Mengajukan)'}</strong>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>PRODUK</th>
                <th>STOK SEKARANG</th>
                <th>BATAS MIN.</th>
                <th>REKOMENDASI PESAN</th>
                <th>PEMASOK</th>
                <th>PRIORITAS</th>
                <th>STATUS PENGAJUAN</th>
                <th>AKSI ALUR KERJA</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(p => {
                const recommendedQty = Math.max(p.min * 2 - p.stock, p.min);
                const isUrgent = p.stock <= p.min / 2;
                const reqStatus = restockStatusMap[p.sku] || 'suggested';

                return (
                  <tr key={p.sku}>
                    <td>
                      <div className="table-product">
                        <div className="product-thumb small" style={{ background: p.tone }}><span /></div>
                        <div>
                          <strong>{p.name}</strong>
                          <small>{p.variant}</small>
                        </div>
                      </div>
                    </td>
                    <td><strong className="negative">{p.stock} unit</strong></td>
                    <td>{p.min} unit</td>
                    <td>
                      <strong style={{ fontSize: '13px', color: '#167d72' }}>
                        {recommendedQty} unit
                      </strong>
                    </td>
                    <td>{p.supplier}</td>
                    <td>
                      <span className={`priority ${isUrgent ? 'urgent' : 'medium'}`}>
                        {isUrgent ? 'Tinggi (Kritis)' : 'Sedang'}
                      </span>
                    </td>
                    <td>
                      <span className={`restock-status ${reqStatus}`}>
                        {reqStatus === 'suggested' && 'Rekomendasi'}
                        {reqStatus === 'pending' && 'Menunggu Approval'}
                        {reqStatus === 'approved' && 'Disetujui Owner'}
                        {reqStatus === 'received' && 'Sudah Diterima'}
                      </span>
                    </td>
                    <td>
                      <div className="action-row-buttons">
                        {reqStatus === 'suggested' && (
                          <button
                            className="btn btn-small btn-secondary"
                            onClick={() => onRestockAction(p.sku, 'submit', recommendedQty)}
                          >
                            Ajukan ke Owner
                          </button>
                        )}

                        {reqStatus === 'pending' && role === 'Owner' && (
                          <button
                            className="btn btn-small btn-primary"
                            onClick={() => onRestockAction(p.sku, 'approve', recommendedQty)}
                          >
                            <Check size={13} /> Setujui Restock
                          </button>
                        )}

                        {reqStatus === 'pending' && role !== 'Owner' && (
                          <span style={{ fontSize: '10px', color: '#9aa6a2' }}>
                            Menunggu Owner
                          </span>
                        )}

                        {reqStatus === 'approved' && (
                          <button
                            className="btn btn-small btn-primary"
                            style={{ background: '#258e7e' }}
                            onClick={() => onRestockAction(p.sku, 'receive', recommendedQty)}
                            title="Konfirmasi bahwa barang dari pemasok telah sampai dan langsung catat ke stok"
                          >
                            <ArrowDownToLine size={13} /> Terima Barang
                          </button>
                        )}

                        {reqStatus === 'received' && (
                          <span style={{ fontSize: '10px', color: '#25816f', fontWeight: '700' }}>
                            <Check size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> Masuk Stok
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredItems.length === 0 && (
            <div className="empty-state">Tidak ada varian yang memerlukan restock pada filter ini.</div>
          )}
        </div>

        <div className="table-bottom">
          <span>Menampilkan <strong>{filteredItems.length}</strong> kebutuhan restock</span>
          <span>Sesuai standar operasional Toko Hijab Sakila</span>
        </div>
      </section>

      <div className="note-card">
        <AlertTriangle size={17} />
        <p>
          <strong>Kanal Notifikasi Multi-Channel:</strong> Notifikasi in-app aktif secara instan pada header & badge.
          Integrasi pengiriman otomatis melalui <em>WhatsApp Gateway</em> dan <em>Email</em> adalah target integrasi tahap backend Laravel setelah penyedia provider dan kredensial disepakati.
        </p>
      </div>
    </>
  );
}

// Sprint 3: Halaman Direktori Pemasok Lengkap
function Suppliers({ suppliers, products, onOpenAddSupplier, onOpenDetail, notify }) {
  return (
    <>
      <PageHeading
        eyebrow="DATA MASTER"
        title="Pemasok (Suppliers)"
        desc="Direktori mitra pengadaan bahan kerudung, kontak resmi, dan katalog varian yang disuplai."
        action="Tambah Pemasok Baru"
        icon={Plus}
        onAction={onOpenAddSupplier}
      />

      <div className="supplier-grid">
        {suppliers.map((s) => {
          const suppliedCount = products.filter(p => p.supplier === s.name).length;
          return (
            <div className="panel supplier-card" key={s.id}>
              <div className="supplier-top">
                <div className="supplier-logo">
                  {s.name.split(' ').map(x => x[0]).slice(0, 2).join('')}
                </div>
                <span className="status status-ok"><i />{s.status}</span>
              </div>
              <h3>{s.name}</h3>
              <p className="supplier-cats">{s.categories}</p>
              <div className="supplier-contact">
                <div><Truck size={15} />{s.phone}</div>
                <div><span>@</span>{s.email}</div>
                <div><MapPin size={15} />{s.address}</div>
              </div>
              <div style={{ marginBottom: '12px', fontSize: '10px', color: '#889893' }}>
                Menyuplai <strong>{suppliedCount}</strong> varian terdaftar
              </div>
              <button
                className="btn btn-secondary full-btn"
                onClick={() => onOpenDetail(s)}
              >
                Lihat Detail Mitra <ArrowUpRight size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

// Sprint 3: Halaman Laporan Inventaris
function Reports({ products, mutations, notify }) {
  const [period, setPeriod] = useState('6bln');

  const data6bln = [
    { month: 'Mei', masuk: 220, keluar: 180 },
    { month: 'Jun', masuk: 280, keluar: 210 },
    { month: 'Jul', masuk: 250, keluar: 240 },
    { month: 'Agu', masuk: 330, keluar: 260 },
    { month: 'Sep', masuk: 290, keluar: 310 },
    { month: 'Okt', masuk: 360, keluar: 275 }
  ];

  const data3bln = [
    { month: 'Agu', masuk: 330, keluar: 260 },
    { month: 'Sep', masuk: 290, keluar: 310 },
    { month: 'Okt', masuk: 360, keluar: 275 }
  ];

  const currentChartData = period === '3bln' ? data3bln : data6bln;

  const handleExportCSVReport = (reportType) => {
    let header = '';
    let rows = [];
    if (reportType === 'stok') {
      header = 'SKU,Nama,Varian,Kategori,Bahan,Stok,BatasMinimum,Status,HargaSatuan,NilaiTotal';
      rows = products.map(p =>
        [p.sku, p.name, p.variant, p.category, p.material, p.stock, p.min, p.stock <= p.min ? 'Stok Menipis' : 'Stok Aman', p.price, p.stock * p.price].join(',')
      );
    } else if (reportType === 'mutasi') {
      header = 'ID,Waktu,Jenis,Produk,SKU,Perubahan,Petugas,Referensi,Catatan';
      rows = mutations.map(m =>
        [m.id, m.time, m.type, m.product, m.sku, m.delta, m.officer, m.ref, m.note || ''].join(',')
      );
    } else {
      header = 'SKU,Nama,Varian,Stok,BatasMinimum,RekomendasiPesan,Pemasok';
      rows = products.filter(p => p.stock <= p.min).map(p =>
        [p.sku, p.name, p.variant, p.stock, p.min, Math.max(p.min * 2 - p.stock, p.min), p.supplier].join(',')
      );
    }

    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `laporan-${reportType}-sakila.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    notify(`Laporan ${reportType} berhasil diekspor (format CSV)`);
  };

  return (
    <>
      <PageHeading
        eyebrow="ANALISIS & PELAPORAN"
        title="Laporan Operasional Inventaris"
        desc="Pantau rekap mutasi keluar-masuk, evaluasi nilai aset persediaan, dan siapkan laporan berkala."
        action="Ekspor Laporan Lengkap (CSV)"
        icon={Download}
        onAction={() => handleExportCSVReport('stok')}
      />

      <div className="stats-grid report-stats">
        <Stat label="Barang masuk periode ini" value="360 unit" sub="Periode berjalan" icon={ArrowDownToLine} tone="teal" />
        <Stat label="Barang keluar periode ini" value="275 unit" sub="Periode berjalan" icon={ArrowUpFromLine} tone="blue" />
        <Stat label="Nilai aset persediaan" value={money(products.reduce((s, p) => s + p.stock * p.price, 0))} sub="Kalkulasi harga satuan" icon={ShoppingBasket} tone="purple" />
        <Stat label="Varian butuh restock" value={products.filter(p => p.stock <= p.min).length + ' varian'} sub="Berdasarkan safety stock" icon={AlertTriangle} tone="amber" />
      </div>

      <section className="panel report-chart">
        <div className="panel-heading">
          <div>
            <h3>Tren Barang Masuk & Keluar</h3>
            <p>Perbandingan volume mutasi keluar vs masuk barang</p>
          </div>
          <div className="chart-period-tabs">
            <button
              className={`chart-period-btn ${period === '3bln' ? 'active' : ''}`}
              onClick={() => setPeriod('3bln')}
            >
              3 Bulan Terakhir
            </button>
            <button
              className={`chart-period-btn ${period === '6bln' ? 'active' : ''}`}
              onClick={() => setPeriod('6bln')}
            >
              6 Bulan Terakhir
            </button>
          </div>
        </div>

        <div className="report-chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentChartData} margin={{ top: 12, right: 12, left: -12, bottom: 0 }} barGap={8}>
              <CartesianGrid strokeDasharray="3 5" vertical={false} stroke="#edf1ef" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#879491', fontSize: 12 }} dy={9} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#879491', fontSize: 11 }} />
              <Tooltip contentStyle={{ border: '1px solid #e7edeb', borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="masuk" name="Barang masuk" fill="#258e7e" radius={[5, 5, 0, 0]} />
              <Bar dataKey="keluar" name="Barang keluar" fill="#b6c8e2" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="export-grid">
        <div className="panel export-card">
          <div className="export-icon"><FileSpreadsheet size={19} /></div>
          <h3>Laporan Posisi Stok</h3>
          <p>Rekapitulasi seluruh varian, kuantitas saat ini, safety stock, dan nilai rupiah per item.</p>
          <button className="text-link" onClick={() => handleExportCSVReport('stok')}>
            Unduh CSV <ArrowUpRight size={14} />
          </button>
          <span className="export-format">Target PDF/XLSX</span>
        </div>

        <div className="panel export-card">
          <div className="export-icon"><FileSpreadsheet size={19} /></div>
          <h3>Laporan Mutasi Transaksi</h3>
          <p>Riwayat kronologis mutasi keluar-masuk barang, faktur pengiriman, dan penyesuaian opname.</p>
          <button className="text-link" onClick={() => handleExportCSVReport('mutasi')}>
            Unduh CSV <ArrowUpRight size={14} />
          </button>
          <span className="export-format">Target PDF/XLSX</span>
        </div>

        <div className="panel export-card">
          <div className="export-icon"><FileSpreadsheet size={19} /></div>
          <h3>Laporan Kebutuhan Restock</h3>
          <p>Daftar prioritas pengadaan varian yang mencapai titik kritis per pemasok.</p>
          <button className="text-link" onClick={() => handleExportCSVReport('restock')}>
            Unduh CSV <ArrowUpRight size={14} />
          </button>
          <span className="export-format">Target PDF/XLSX</span>
        </div>
      </div>
    </>
  );
}

// Sprint 3: Halaman Pengguna & Peran (Role View)
function UsersPage({ role, setRole, onOpenDetailUser, notify }) {
  const users = [
    ['Rahayu A.', 'rahayu@hijabsakila.id', 'Owner', 'Aktif'],
    ['Staf Gudang 01', 'gudang01@hijabsakila.id', 'Admin', 'Aktif'],
    ['Staf Gudang 02', 'gudang02@hijabsakila.id', 'Admin', 'Aktif']
  ];

  return (
    <>
      <PageHeading
        eyebrow="AKSES SISTEM"
        title="Pengguna & Hak Akses"
        desc="Gambaran wewenang operasional pemilik toko (Owner) dan staf gudang (Admin)."
        action="Tambah Pengguna Baru"
        onAction={() => notify('Pengelolaan akun pengguna riil membutuhkan backend Laravel Authentication')}
      />

      <div className="notice-banner">
        <div><Users size={19} /></div>
        <p>
          <strong>Role Aktif Pratinjau: <span className={`role-badge-pill ${role === 'Owner' ? 'owner' : 'admin'}`}>{role}</span></strong><br />
          Klik switch role untuk menguji tampilan antarmuka dari sudut pandang <strong>Owner</strong> (akses restock approval & safety stock)
          atau <strong>Admin/Staf Gudang</strong> (operasional stok masuk/keluar & hitung fisik).
        </p>
        <button
          className="btn btn-secondary"
          onClick={() => setRole(role === 'Owner' ? 'Admin' : 'Owner')}
          style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}
        >
          <ShieldCheck size={15} /> Beralih ke {role === 'Owner' ? 'Admin' : 'Owner'}
        </button>
      </div>

      <section className="panel table-panel">
        <div className="panel-heading">
          <div>
            <h3>Daftar Pengguna Sistem</h3>
            <p>Akun terdaftar pada sistem informasi Toko Hijab Sakila</p>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>NAMA PENGGUNA</th>
                <th>ALAMAT EMAIL</th>
                <th>PERAN / ROLE</th>
                <th>STATUS</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u[1]}>
                  <td>
                    <div className="table-product">
                      <div className="avatar">{u[0].split(' ').map(x => x[0]).slice(0, 2).join('')}</div>
                      <strong>{u[0]}</strong>
                    </div>
                  </td>
                  <td>{u[1]}</td>
                  <td>
                    <span className={`role-badge-pill ${u[2] === 'Owner' ? 'owner' : 'admin'}`}>
                      {u[2]}
                    </span>
                  </td>
                  <td><span className="status status-ok"><i />{u[3]}</span></td>
                  <td>
                    <button
                      className="icon-btn"
                      onClick={() => onOpenDetailUser(u)}
                      title="Lihat profil pengguna"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="role-grid">
        <div className="panel role-card">
          <div className="role-icon owner"><Users size={18} /></div>
          <h3>Owner (Pemilik Toko)</h3>
          <p>Memegang wewenang pengawasan menyeluruh, persetujuan biaya, dan penentuan safety stock.</p>
          <ul>
            <li><Check size={14} /> Dashboard analitik persediaan & laporan nilai aset</li>
            <li><Check size={14} /> Pengaturan parameter batas minimum (safety stock)</li>
            <li><Check size={14} /> Persetujuan resmi (approval) pengajuan restock</li>
            <li><Check size={14} /> Evaluasi laporan bulanan & mutasi</li>
          </ul>
        </div>

        <div className="panel role-card">
          <div className="role-icon admin"><Package size={18} /></div>
          <h3>Admin / Staf Gudang</h3>
          <p>Bertanggung jawab pada pengelolaan barang fisik di toko dan pencatatan transaksi persediaan.</p>
          <ul>
            <li><Check size={14} /> Pencatatan barang masuk dari pemasok</li>
            <li><Check size={14} /> Pencatatan barang keluar (penjualan & retur cacat)</li>
            <li><Check size={14} /> Pelaksanaan hitung fisik stock opname</li>
            <li><Check size={14} /> Pengajuan rekomendasi restock ke Owner</li>
          </ul>
        </div>
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
