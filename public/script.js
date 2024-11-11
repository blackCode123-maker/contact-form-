document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const attachment = document.getElementById('attachment').files[0];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address'
        });
        return;
    }

    // Phone validation (basic)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Phone Number',
            text: 'Please enter a valid 10-digit phone number'
        });
        return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);
    if (attachment) {
        formData.append('attachment', attachment);
    }

    try {
        // Show loading state
        Swal.fire({
            title: 'Sending...',
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await fetch('/send-email', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your message has been sent successfully!'
            });
            document.getElementById('contactForm').reset();
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message || 'Something went wrong!'
        });
    }
});
