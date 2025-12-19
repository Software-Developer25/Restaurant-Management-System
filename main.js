 let cart = [];
        
        // Page navigation functionality
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page-container').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Find and activate the corresponding nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.textContent.toLowerCase().includes(pageId) || 
                    (pageId === 'home' && link.textContent.toLowerCase() === 'home')) {
                    link.classList.add('active');
                }
            });
            
            // If cart page is shown, update cart display
            if (pageId === 'cart') {
                updateCartDisplay();
            }
            
            // Scroll to top when changing pages
            window.scrollTo(0, 0);
        }

        // Menu filtering functionality
        function filterMenu(category) {
            const menuItems = document.querySelectorAll('.menu-item');
            const categoryButtons = document.querySelectorAll('.category-btn');
            
            // Update active category button
            categoryButtons.forEach(button => {
                button.classList.remove('active');
                if (button.textContent.toLowerCase() === category) {
                    button.classList.add('active');
                }
            });
            
            // Show/hide menu items based on category
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });

        // Login form submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login functionality would be implemented here!');
            this.reset();
        });

        // Add to cart functionality
        document.addEventListener('DOMContentLoaded', function() {
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const dishCard = this.closest('.dish-card, .menu-item');
                    const dishName = dishCard.querySelector('h3').textContent;
                    const dishPrice = dishCard.querySelector('.price').textContent;
                    const dishImage = dishCard.querySelector('.dish-image, .menu-item-image').style.backgroundImage;
                    
                    // Extract price as number
                    const price = parseFloat(dishPrice.replace('$', ''));
                    
                    // Add item to cart
                    addToCart(dishName, price, dishImage);
                    
                    // Create a temporary notification
                    const notification = document.createElement('div');
                    notification.textContent = `Added ${dishName} to cart!`;
                    notification.style.position = 'fixed';
                    notification.style.bottom = '20px';
                    notification.style.right = '20px';
                    notification.style.backgroundColor = 'var(--primary)';
                    notification.style.color = 'white';
                    notification.style.padding = '1rem 2rem';
                    notification.style.borderRadius = '5px';
                    notification.style.zIndex = '1000';
                    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                    
                    document.body.appendChild(notification);
                    
                    // Remove notification after 3 seconds
                    setTimeout(() => {
                        notification.style.opacity = '0';
                        notification.style.transition = 'opacity 0.5s';
                        setTimeout(() => {
                            document.body.removeChild(notification);
                        }, 500);
                    }, 3000);
                });
            });
        });

        // Cart functions
        function addToCart(name, price, image) {
            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }
            
            updateCartCount();
        }

        function updateCartCount() {
            const cartCount = document.getElementById('cart-count');
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        function updateCartDisplay() {
            const cartContent = document.getElementById('cart-content');
            
            if (cart.length === 0) {
                cartContent.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <h3>Your cart is empty</h3>
                        <p>Add some delicious items from our menu</p>
                        <button class="cta-button" onclick="showPage('menu')">Browse Menu</button>
                    </div>
                `;
            } else {
                let cartHTML = '<div class="cart-items">';
                
                cart.forEach((item, index) => {
                    cartHTML += `
                        <div class="cart-item">
                            <div class="cart-item-image" style="${item.image}"></div>
                            <div class="cart-item-details">
                                <h3>${item.name}</h3>
                                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                            </div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                            </div>
                            <button class="remove-item" onclick="removeFromCart(${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                });
                
                cartHTML += '</div>';
                cartContent.innerHTML = cartHTML;
            }
            
            updateCartSummary();
        }

        function updateQuantity(index, change) {
            cart[index].quantity += change;
            
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            
            updateCartCount();
            updateCartDisplay();
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartCount();
            updateCartDisplay();
        }

        function updateCartSummary() {
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            const tax = subtotal * 0.08;
            const total = subtotal + tax;
            
            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
            document.getElementById('total').textContent = `$${total.toFixed(2)}`;
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty. Add some items before checkout.');
                return;
            }
            
            alert('Checkout functionality would be implemented here!');
            // In a real application, this would redirect to a payment page
        }