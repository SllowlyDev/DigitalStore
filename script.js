// Data produk
const products = [
    {
        id: 1,
        name: "Gmail Fresh",
        price: 4000,
        minOrder: 1,
        description: "Akun Gmail baru yang belum pernah digunakan sebelumnya. Cocok untuk berbagai kebutuhan digital seperti pendaftaran aplikasi, verifikasi akun, maupun aktivitas online sehari-hari."
    },
    {
        id: 2,
        name: "Gmail Bekas",
        price: 2000,
        minOrder: 1,
        description: "Akun Gmail yang sebelumnya pernah digunakan untuk login aplikasi atau proses konfirmasi. Tetap layak digunakan untuk berbagai kebutuhan tambahan dengan harga lebih ekonomis."
    },
    {
        id: 3,
        name: "Gsuite 1 Hari",
        price: 400,
        minOrder: 35,
        description: "Akun Gmail berbasis domain custom (Gsuite) dengan masa aktif 1 hari. Cocok digunakan untuk kebutuhan sementara seperti registrasi layanan atau aktivitas digital jangka pendek."
    },
    {
        id: 4,
        name: "Gsuite 3 Hari",
        price: 600,
        minOrder: 35,
        description: "Akun Gmail berbasis domain custom (Gsuite) dengan masa aktif 3 hari. Ideal untuk kebutuhan verifikasi akun atau aktivitas sementara dalam jangka waktu lebih lama."
    },
    {
        id: 5,
        name: "Gsuite 5 Hari",
        price: 800,
        minOrder: 35,
        description: "Akun Gmail domain custom dengan durasi aktif 5 hari. Memberikan fleksibilitas penggunaan untuk kebutuhan digital sementara."
    },
    {
        id: 6,
        name: "Gsuite 7 Hari",
        price: 1000,
        minOrder: 35,
        description: "Akun Gmail berbasis domain custom dengan masa aktif hingga 7 hari. Sangat cocok untuk kebutuhan operasional digital jangka pendek."
    },
    {
        id: 7,
        name: "Facebook Biasa",
        price: 15000,
        minOrder: 1,
        description: "Akun Facebook berumur dari tahun 2020 hingga 2025 yang siap digunakan untuk aktivitas sosial media seperti berbagi konten, komunikasi, dan aktivitas komunitas."
    },
    {
        id: 8,
        name: "Facebook Spam",
        price: 20000,
        minOrder: 1,
        description: "Akun Facebook berumur dari tahun 2016 hingga 2020. Cocok untuk kebutuhan distribusi promosi, pemasaran, atau aktivitas kampanye digital."
    },
    {
        id: 9,
        name: "Facebook Iklan",
        price: 25000,
        minOrder: 1,
        description: "Akun Facebook berumur dari tahun 2010 hingga 2019 yang siap digunakan untuk kebutuhan pemasaran digital, promosi produk, serta aktivitas marketplace dan iklan."
    },
    {
        id: 10,
        name: "Facebook",
        price: 30000,
        minOrder: 1,
        description: "Akun Facebook lama dengan usia tinggi (2010–2019) yang cocok untuk aktivitas sosial media sehari-hari dan membangun jaringan digital."
    },
    {
        id: 11,
        name: "Tools Create FB Basic",
        price: 150000,
        minOrder: 1,
        description: "Program berbasis Termux yang dirancang untuk membantu membuat akun Facebook mentah secara otomatis. Cocok digunakan untuk membangun stok akun yang siap dikonfirmasi."
    },
    {
        id: 12,
        name: "Tools Create FB Medium",
        price: 200000,
        minOrder: 1,
        description: "Versi lanjutan dari tools Facebook Basic dengan fitur tambahan berupa konfirmasi manual langsung melalui tools tanpa perlu login ke browser. Cocok untuk seller akun Facebook fresh."
    },
    {
        id: 13,
        name: "Tools Create FB Limited",
        price: 250000,
        minOrder: 1,
        description: "Versi paling lengkap dari tools pembuatan akun Facebook dengan fitur otomatisasi dan konfirmasi manual yang lebih canggih. Dirancang untuk kebutuhan produksi akun dalam jumlah besar."
    }
];

// Fungsi untuk menampilkan produk di halaman utama
function displayProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">Rp ${product.price.toLocaleString()}</div>
                <div class="product-min">
                    <i class="fas fa-info-circle"></i> Minimal beli: ${product.minOrder}
                </div>
                <div class="quantity-control">
                    <label for="qty-${product.id}">Jumlah:</label>
                    <input type="number" id="qty-${product.id}" class="quantity-input" value="${product.minOrder}" min="${product.minOrder}">
                </div>
                <button class="btn-buy" onclick="buyProduct(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Beli
                </button>
            </div>
        </div>
    `).join('');
}

// Fungsi untuk membeli produk
function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    const quantityInput = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(quantityInput.value);

    // Validasi minimal pembelian
    if (quantity < product.minOrder) {
        alert(`Minimal pembelian untuk produk ini adalah ${product.minOrder}`);
        return;
    }

    // Simpan data ke localStorage
    const orderData = {
        product: product,
        quantity: quantity,
        total: product.price * quantity
    };

    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    
    // Redirect ke halaman checkout
    window.location.href = 'checkout.html';
}

// Fungsi untuk menampilkan detail pesanan di halaman checkout
function displayOrderDetails() {
    const orderDetails = document.getElementById('order-details');
    if (!orderDetails) return;

    const orderData = JSON.parse(localStorage.getItem('currentOrder'));
    
    if (!orderData) {
        window.location.href = 'index.html';
        return;
    }

    orderDetails.innerHTML = `
        <div class="order-item">
            <span>Produk:</span>
            <strong>${orderData.product.name}</strong>
        </div>
        <div class="order-item">
            <span>Harga satuan:</span>
            <span>Rp ${orderData.product.price.toLocaleString()}</span>
        </div>
        <div class="order-item">
            <span>Jumlah:</span>
            <span>${orderData.quantity}</span>
        </div>
        <div class="order-total">
            <span>Total:</span>
            <span>Rp ${orderData.total.toLocaleString()}</span>
        </div>
    `;
}

// Fungsi untuk memproses pembayaran via WhatsApp
function processPayment() {
    const orderData = JSON.parse(localStorage.getItem('currentOrder'));
    const name = document.getElementById('name')?.value;
    const whatsapp = document.getElementById('whatsapp')?.value;

    if (!name || !whatsapp) {
        alert('Silakan isi nama dan nomor WhatsApp terlebih dahulu');
        return;
    }

    // Format pesan WhatsApp
    const message = `Halo Admin, saya ingin melakukan pembelian.

Produk: ${orderData.product.name}
Jumlah: ${orderData.quantity}
Total: Rp ${orderData.total.toLocaleString()}
Nama: ${name}

No. WhatsApp: ${whatsapp}`;

    // Ganti dengan nomor WhatsApp admin
    const adminPhone = '6281234567890'; // Ganti dengan nomor admin
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Fungsi untuk konfirmasi pembayaran
function confirmPayment() {
    const orderData = JSON.parse(localStorage.getItem('currentOrder'));
    const name = document.getElementById('name')?.value;

    if (!name) {
        alert('Silakan isi nama terlebih dahulu');
        return;
    }

    const message = `Halo Admin, saya sudah melakukan pembayaran.

Produk: ${orderData.product.name}
Jumlah: ${orderData.quantity}
Total: Rp ${orderData.total.toLocaleString()}
Nama: ${name}

Mohon segera diproses. Terima kasih.`;

    const adminPhone = '6281234567890'; // Ganti dengan nomor admin
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Fungsi untuk copy ke clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Berhasil disalin!');
    }).catch(err => {
        alert('Gagal menyalin teks');
    });
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan produk di halaman utama
    displayProducts();
    
    // Tampilkan detail pesanan di halaman checkout
    displayOrderDetails();
});
