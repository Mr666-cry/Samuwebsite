document.addEventListener('DOMContentLoaded', () => {

    // =====================================================================
    // DATA PRODUK & STOK
    // =====================================================================
    const stockData = {
        "VPS Digital Ocean": { "isAvailable": false }, // Stok kartu utama masih ada
        "Akses Panel":       { "isAvailable": true },
        "Panel Privat":      { "isAvailable": false },
        "Panel Public":      { "isAvailable": true }
    };

    const productSpecs = {
        'VPS Digital Ocean': [
            { ram: '8 GB', core: '4', price: 'Rp50.000', available: true },
            { ram: '16 GB', core: '4', price: 'Rp60.000', available: true },
            { ram: '16 GB', core: '8', price: 'Rp75.000', available: true },
            { ram: '32 GB', core: '8', price: 'Rp135.000', available: true }
        ],
        'Akses Panel': [
            { res: 'Reseller Panel', price: 'Rp5.000', available: false },
            { adp: 'Admin Panel', price: 'Rp8.000', available: true },
            { pt: 'Pt Panel', price: 'Rp15.000', available: true },
            { own: 'Own Panel', price: 'Rp25.000', available: true },
            { kanan: 'Tangan Kanan Panel', price: 'Rp30.000', available: false }
        ],
        'Panel Privat': [
            { ram: '2 GB', cpu: '60%', price: 'Rp3.000/BLN', available: true },
            { ram: '3 GB', cpu: '80%', price: 'Rp4.000/BLN', available: true },
            { ram: '4 GB', cpu: '100%', price: 'Rp5.000/BLN', available: true },
            { ram: '5 GB', cpu: '120%', price: 'Rp6.000/BLN', available: true },
            { ram: '6 GB', cpu: '140%', price: 'Rp7.000/BLN', available: true },
            { ram: '7 GB', cpu: '160%', price: 'Rp8.000/BLN', available: true },
            { ram: '8 GB', cpu: '180%', price: 'Rp9.000/BLN', available: true },
            { ram: '9 GB', cpu: '200%', price: 'Rp10.000/BLN', available: true },
            { ram: 'UNLIMITED', cpu: 'UNLIMITED', price: 'Rp12.000/BLN', available: true }
        ],
        'Panel Public': [
            { ram: '2 GB', cpu: '40%', price: 'Rp2.000/BLN', available: true },
            { ram: '3 GB', cpu: '60%', price: 'Rp3.000/BLN', available: true },
            { ram: '4 GB', cpu: '80%', price: 'Rp4.000/BLN', available: true },
            { ram: '5 GB', cpu: '100%', price: 'Rp5.000/BLN', available: true },
            { ram: '6 GB', cpu: '120%', price: 'Rp6.000/BLN', available: true },
            { ram: '7 GB', cpu: '140%', price: 'Rp7.000/BLN', available: true },
            { ram: '8 GB', cpu: '160%', price: 'Rp8.000/BLN', available: true },
            { ram: '9 GB', cpu: '180%', price: 'Rp9.000/BLN', available: true },
            { ram: 'UNLIMITED', cpu: 'UNLIMITED', price: 'Rp10.000/BLN', available: true }
        ]
    };

    // FUNGSI BARU UNTUK MENGISI KATALOG
    function generateCatalogItems() {
        for (const productName in productSpecs) {
            const listElement = document.querySelector(`[data-product-list="${productName}"]`);
            if (!listElement) continue;

            listElement.innerHTML = '';
            const specs = productSpecs[productName];

            specs.forEach((spec, index) => {
                const isUnavailable = !spec.available;
                const unavailabilityClass = isUnavailable ? 'spec-unavailable' : '';
                
                let itemContentHTML = '';
                if (spec.ram && spec.core) {
                    itemContentHTML = `<li><i class="fa-solid fa-server"></i> RAM: ${spec.ram}</li><li><i class="fa-solid fa-microchip"></i> Core: ${spec.core}</li>`;
                } else if (spec.ram && spec.cpu) {
                    itemContentHTML = `<li><i class="fa-solid fa-server"></i> RAM: ${spec.ram}</li><li><i class="fa-solid fa-microchip"></i> CPU: ${spec.cpu}</li>`;
                } else if (spec.res) {
                    itemContentHTML = `<li><i class="fa-solid fa-users"></i> ${spec.res}</li>`;
                } else if (spec.adp) {
                    itemContentHTML = `<li><i class="fa-solid fa-user-shield"></i> ${spec.adp}</li>`;
                } else if (spec.pt) {
                    itemContentHTML = `<li><i class="fa-solid fa-building-user"></i> ${spec.pt}</li>`;
                } else if (spec.own) {
                    itemContentHTML = `<li><i class="fa-solid fa-crown"></i> ${spec.own}</li>`;
                } else if (spec.kanan) {
                    itemContentHTML = `<li><i class="fa-solid fa-handshake"></i> ${spec.kanan}</li>`;
                } else if (spec.name) {
                    itemContentHTML = `<li><i class="fa-solid fa-bolt"></i> ${spec.name}</li>`;
                    if (spec.details) {
                        itemContentHTML += `<li><i class="fa-solid fa-circle-info"></i> ${spec.details}</li>`;
                    }
                }
                itemContentHTML += `<li class="harga"><i class="fa-solid fa-tag"></i> Harga: ${spec.price}</li>`;
                
                const wrapperDiv = document.createElement('div');
                wrapperDiv.className = `spec-item-wrapper ${unavailabilityClass}`;
                wrapperDiv.innerHTML = itemContentHTML;

                if (isUnavailable) {
                    const overlayDiv = document.createElement('div');
                    overlayDiv.className = 'spec-stock-overlay';
                    overlayDiv.innerHTML = `<span>Full (closed) / Habis</span>`;
                    wrapperDiv.appendChild(overlayDiv);
                }

                listElement.appendChild(wrapperDiv);

                if (index < specs.length - 1) {
                    const separator = document.createElement('li');
                    separator.className = 'separator';
                    listElement.appendChild(separator);
                }
            });
        }
    }
    
    generateCatalogItems();

    const katalogGrid = document.querySelector('.katalog-grid');
    const btnLeft = document.querySelector('.katalog-nav-btn.left');
    const btnRight = document.querySelector('.katalog-nav-btn.right');

    const scrollAmount = 300; // jumlah pixel scroll per klik, sesuaikan jika perlu

    btnLeft.addEventListener('click', () => {
        katalogGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
        katalogGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });


    function applyStockStatus(card, button, isAvailable) {
        if (!isAvailable) {
            card.classList.add('out-of-stock');
            button.disabled = true;
            if (!card.querySelector('.stock-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'stock-overlay';
                overlay.innerHTML = '<span>Full (closed) / Habis</span>';
                card.prepend(overlay);
            }
        } else {
            card.classList.remove('out-of-stock');
            button.disabled = false;
            const overlay = card.querySelector('.stock-overlay');
            if (overlay) overlay.remove();
        }
    }

    for (const productName in stockData) {
        const productInfo = stockData[productName];
        const button = document.querySelector(`.order-btn[data-product="${productName}"]`);
        if (button) {
            const card = button.closest('.card');
            if (card) applyStockStatus(card, button, productInfo.isAvailable);
        }
    }

    const openNavBtn = document.getElementById('open-sidenav-btn');
    const closeNavBtn = document.getElementById('close-sidenav-btn');
    const sidenav = document.getElementById('sidenav');
    const overlay = document.getElementById('overlay');
    
    if(openNavBtn && sidenav && overlay && closeNavBtn) {
        const openNav = () => { sidenav.classList.add('active'); overlay.classList.add('active'); };
        const closeNav = () => { sidenav.classList.remove('active'); overlay.classList.remove('active'); };
        openNavBtn.addEventListener('click', openNav);
        closeNavBtn.addEventListener('click', closeNav);
        overlay.addEventListener('click', closeNav);
        sidenav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
    }

    const orderButtons = document.querySelectorAll('.order-btn');
    const modal = document.getElementById('order-modal');
    const orderModalCloseBtn = document.querySelector('#order-modal .close-btn');
    const orderForm = document.getElementById('order-form');
    const modalTitle = document.getElementById('modal-title');
    const spesifikasiSelect = document.getElementById('spesifikasi');
    
    if (modal) {
        orderButtons.forEach(button => {
            if (!button.disabled) {
                button.addEventListener('click', () => {
                    const productName = button.dataset.product;
                    modalTitle.textContent = `Pesan ${productName}`;
                    spesifikasiSelect.innerHTML = '';
                    const specs = productSpecs[productName] || [];

                    specs.forEach(spec => {
                        let specText = '';
                        if (spec.ram && spec.core) specText = `RAM: ${spec.ram}, Core: ${spec.core}`;
                        else if (spec.ram && spec.cpu) specText = `RAM: ${spec.ram}, CPU: ${spec.cpu}`;
                        else if (spec.res) specText = spec.res;
                        else if (spec.adp) specText = spec.adp;
                        else if (spec.pt) specText = spec.pt;
                        else if (spec.own) specText = spec.own;
                        else if (spec.kanan) specText = spec.kanan;
                        else if (spec.name) specText = spec.name;

                        const option = document.createElement('option');
                        option.value = `${specText} - ${spec.price}`;
                        
                        if (!spec.available) {
                            option.textContent = `${specText} [Full (Closed) / Habis]`;
                            option.disabled = true;
                        } else {
                            option.textContent = `${specText} (${spec.price})`;
                        }
                        spesifikasiSelect.appendChild(option);
                    });
                    modal.classList.add('active');
                });
            }
        });
        
        const closeModal = () => modal.classList.remove('active');
        orderModalCloseBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => { if (e.target == modal) closeModal(); });

        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nama = document.getElementById('nama').value;
            const spesifikasi = document.getElementById('spesifikasi').value;
            const metodeBayar = document.getElementById('metode-bayar').value;
            const productName = modalTitle.textContent.replace('Pesan ', '');
            const message = `Halo, saya ingin memesan:\n- Nama: ${nama}\n- Produk: ${productName}\n- Spesifikasi: ${spesifikasi}\n- Metode Pembayaran: ${metodeBayar}`;
            const whatsappURL = `https://wa.me/62895393687004?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    }

    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const targetElement = document.getElementById(targetId);
            if(targetElement) {
                navigator.clipboard.writeText(targetElement.innerText).then(() => {
                    const originalText = button.textContent;
                    button.textContent = 'Disalin!';
                    button.classList.add('copied');
                    setTimeout(() => { button.textContent = originalText; button.classList.remove('copied'); }, 1500);
                });
            }
        });
    });

    const qrisImage = document.querySelector('.qris-container img');
    if (qrisImage) {
        qrisImage.addEventListener('click', function() {
            const qrisOverlay = document.createElement('div');
            qrisOverlay.className = 'qris-zoom-overlay';
            const zoomedImage = document.createElement('img');
            zoomedImage.src = this.src;
            qrisOverlay.appendChild(zoomedImage);
            document.body.appendChild(qrisOverlay);
            setTimeout(() => { qrisOverlay.classList.add('active'); }, 10);
            const closeZoom = () => {
                qrisOverlay.classList.remove('active');
                qrisOverlay.addEventListener('transitionend', () => { if (qrisOverlay.parentNode) qrisOverlay.parentNode.removeChild(qrisOverlay); }, { once: true });
            };
            qrisOverlay.addEventListener('click', closeZoom);
        });
    }

    document.querySelectorAll('.qna-item').forEach(item => {
        const question = item.querySelector('.qna-question');
        question.addEventListener('click', () => {
            const answer = item.querySelector('.qna-answer');
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.qna-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.qna-answer').style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else {
        body.setAttribute('data-theme', 'light');
    }
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});