from app import app, db
from config import Config
import os

# Create database directory if it doesn't exist
if not os.path.exists('database'):
    os.makedirs('database')

with app.app_context():
    # Create all tables
    db.create_all()
    
    # Add sample testimonials
    from models import Testimonial
    
    sample_testimonials = [
        Testimonial(
            name="Priya Sharma",
            position="Regular Client",
            content="Travaa Wellness transformed my self-care routine. Their spa treatments are exceptional!",
            rating=5,
            image="client1.jpg",
            is_featured=True
        ),
        Testimonial(
            name="Rohan Mehta",
            position="Business Executive",
            content="The nail art is absolutely stunning. Attention to detail is remarkable.",
            rating=5,
            image="client2.jpg",
            is_featured=True
        ),
        Testimonial(
            name="Ananya Reddy",
            position="Fashion Influencer",
            content="Best wellness experience in the city. Luxurious yet affordable.",
            rating=5,
            image="client3.jpg",
            is_featured=True
        ),
        Testimonial(
            name="Vikram Singh",
            position="Corporate Client",
            content="Professional staff, premium services. My go-to place for relaxation.",
            rating=5,
            image="client4.jpg",
            is_featured=True
        )
    ]
    
    for testimonial in sample_testimonials:
        db.session.add(testimonial)
    
    # Add sample blog posts
    from models import BlogPost
    
    sample_posts = [
        BlogPost(
            title="The Art of Luxury Spa Treatments",
            slug="luxury-spa-treatments",
            excerpt="Discover the secrets behind our premium spa treatments that redefine relaxation.",
            content="""# The Art of Luxury Spa Treatments

At Travaa Wellness, we believe that true luxury lies in the details. Our spa treatments are meticulously crafted to provide an unparalleled experience of relaxation and rejuvenation.

## What Makes Our Treatments Special?

### 1. Premium Ingredients
We use only the finest organic ingredients sourced from around the world. Each product is carefully selected for its purity and effectiveness.

### 2. Expert Therapists
Our therapists undergo rigorous training in traditional and modern techniques, ensuring every treatment is perfectly executed.

### 3. Customized Experience
Every treatment is tailored to your specific needs, creating a personalized journey to wellness.

## Signature Treatments

- **Aromatherapy Massage**: A sensory journey using essential oils
- **Hot Stone Therapy**: Deep relaxation with heated basalt stones
- **Detox Body Wrap**: Purify and rejuvenate your skin

Visit us to experience the ultimate in luxury wellness.""",
            author="Dr. Sarah Chen",
            category="Spa",
            image="spa-treatment.jpg",
            is_published=True
        ),
        BlogPost(
            title="Latest Nail Art Trends 2024",
            slug="nail-art-trends-2024",
            excerpt="Explore the hottest nail art designs and techniques taking the beauty world by storm.",
            content="""# Latest Nail Art Trends 2024

The world of nail art is constantly evolving, and 2024 brings some exciting new trends that combine creativity with elegance.

## Top Trends to Watch

### 1. Minimalist French Tips
A modern twist on the classic French manicure with delicate designs and subtle accents.

### 2. Chrome Effects
Metallic and chrome finishes that catch the light beautifully, perfect for evening events.

### 3. 3D Embellishments
Tasteful 3D elements that add texture and dimension without being overwhelming.

### 4. Negative Space
Creative use of bare nail space to create sophisticated, modern designs.

## Our Expert Approach

At Travaa Wellness, our nail artists stay ahead of trends while maintaining our signature elegant style. We focus on:

- **Quality Materials**: Only premium polishes and gels
- **Hygiene First**: Sterilized tools and clean environment
- **Custom Designs**: Bring your vision to life

Book a consultation to create your perfect nail art design!""",
            author="Maya Patel",
            category="Nails",
            image="nail-art.jpg",
            is_published=True
        )
    ]
    
    for post in sample_posts:
        db.session.add(post)
    
    try:
        db.session.commit()
        print("Database created successfully with sample data!")
    except Exception as e:
        db.session.rollback()
        print(f"Error creating database: {e}")