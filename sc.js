document.addEventListener('DOMContentLoaded', () => {

    // =====================================================================
    // DATA PRODUK & STOK
    // =====================================================================
    const stockData = {
        "SC DRAGON":      { "isAvailable": true },
        "SC QUEEN XAUTH":      { "isAvailable": true },
        "SC VOID STORM":      { "isAvailable": true },
        "SC COMING SOON":      { "isAvailable": false }
    };

    const productSpecs = {
        'SC DRAGON': [
            { name: 'NO UPDATE', details: 'NO UPDATE', price: 'Rp15.000', available: true },
            { name: 'FULL UP', details: 'FULL UP 5X', price: 'Rp20.000', available: true },
            { name: 'FULL UP', details: 'FULL UP 7X', price: 'Rp25.000', available: true },
            { name: 'FULL UP', details: 'FULL UP PERMANENT', price: 'Rp35.000', available: true },
            { name: 'RESELLER SC', details: 'BENEFIT?? SUNG TANYA AJA', price: 'Rp45.000', available: true },
            { name: 'PARTNER SC', details: 'BENEFIT?? SUNG TANYA AJA', price: 'Rp50.000', available: true },
            { name: 'TANGAN KANAN SC', details: 'BENEFIT?? SUNG TANYA AJA', price: 'Rp80.000', available: true }
        ],
        'SC QUEEN XAUTH': [
            { name: 'NO UPDATE', details: 'NO UPDATE', price: 'Rp25.000', available: true },
            { name: 'FULL UP', details: 'FULL UP', price: 'Rp35.000', available: true },
            { name: 'RESELLER SC', details: 'BENEFIT?? SUNG TANYA AJA', price: 'Rp45.000', available: true },
            { name: 'PARTNER SC', details: 'BENEFIT?? SUNG TANYA AJA', price: 'Rp60.000', available: true },
        ],
        'SC VOID STORM': [
            { name: 'NO UPDATE', details: 'NO UPDATE', price: 'Rp70.000', available: true },
            { name: 'UPDATE', details: 'UPDATE 3x', price: 'Rp110.000', available: true },
            { name: 'FULL UP', details: 'UPDATE PERMA', price: 'Rp130.000', available: true },
            { name: 'RESELLER SC', details: 'BENEFIT?? SUNG TANYA AJA', price: 'Rp150.000', available: true },
            { name: 'PARTNER SC', details: 'BENEFIT?? SUNG TANYA AJA', price: 'Rp170.000', available: true },
        ],
        'SC COMING SOON': [
            { name: 'NO UPDATE', details: 'NO UPDATE', price: 'Rp70.000', available: true },
            { name: 'UPDATE', details: 'UPDATE 3x', price: 'Rp110.000', available: true },
            { name: 'FULL UP', details: 'UPDATE PERMA', price: 'Rp130.000', available: true },
            { name: 'RESELLER SC', details: 'BENEFIT?? SUNG TANYA AJA', price: 'Rp150.000', available: true },
            { name: 'PARTNER SC', details: 'BENEFIT?? SUNG TANYA AJA', price: 'Rp170.000', available: true },
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
                if (spec.name) {
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
                        if (spec.name) specText = spec.name;

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