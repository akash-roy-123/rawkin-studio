import { useEffect, useState } from 'react';

type Product = {
  id: string;
  number: string;
  subtitle: string;
  name: string;
  category: string;
  size: string;
  photo: string;
  alt: string;
  note: string;
  ritual: string;
  details: string;
};

const products: Product[] = [
  {
    id: 'chamomile-scrub', number: '01', subtitle: 'MATCHA + CHAMOMILE',
    name: 'Calming Face Scrub', category: 'THE GENTLE RESET', size: '100 g',
    photo: './images/scrub.webp',
    alt: 'RawKin Matcha and Chamomile Calming Face Scrub jar pictured in the original brand display',
    note: 'A little moment to reset your skincare ritual.',
    ritual: 'Apply a small amount to damp skin, gently massage in circular motions and rinse with water, as directed on the product label.',
    details: 'The ingredient label lists glycerin, jojoba oil, matcha powder, chamomile extract and sugar, among other ingredients.',
  },
  {
    id: 'peppermint-mask', number: '02', subtitle: 'MATCHA + PEPPERMINT',
    name: 'Detoxifying Clay Mask', category: 'THE WEEKLY RITUAL', size: '100 g',
    photo: './images/mask.webp',
    alt: 'RawKin Matcha and Peppermint Detoxifying Clay Mask jar pictured in the original brand display',
    note: 'An invitation to make time for yourself.',
    ritual: 'Follow the directions on your product label. For any ingredient or suitability questions, contact RawKin before use.',
    details: 'A matcha and peppermint clay-mask concept, as named on the original packaging. Full formulation details are available from the maker.',
  },
  {
    id: 'vanilla-balm', number: '03', subtitle: 'MATCHA + VANILLA',
    name: 'Cooling Lip Balm', category: 'THE EVERYDAY ESSENTIAL', size: '5 g',
    photo: './images/lip-balm.webp',
    alt: 'RawKin Matcha and Vanilla Cooling Lip Balm tube pictured in the original brand display',
    note: 'The smallest ritual, ready to travel with you.',
    ritual: 'Use as directed on the product label. Ask RawKin if you have questions about ingredients or suitability.',
    details: 'A matcha and vanilla lip balm as pictured in the original brand display.',
  },
];

const mailto = (subject: string) =>
  `mailto:hellorawkin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Hello RawKin team,\n\nI would like to know more about availability, pricing and ordering.\n\nThank you.')}`;

function Icon({ name, size = 22 }: { name: 'arrow' | 'arrowUp' | 'menu' | 'close' | 'spark' | 'leaf' | 'mail' | 'bag' | 'chevron'; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const };
  if (name === 'arrow') return <svg {...common}><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
  if (name === 'arrowUp') return <svg {...common}><path d="M7 17 17 7M8 7h9v9" /></svg>;
  if (name === 'menu') return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
  if (name === 'close') return <svg {...common}><path d="m5 5 14 14M19 5 5 19" /></svg>;
  if (name === 'mail') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  if (name === 'bag') return <svg {...common}><path d="M5 9h14l-1 12H6L5 9ZM9 9V7a3 3 0 0 1 6 0v2" /></svg>;
  if (name === 'chevron') return <svg {...common}><path d="m9 6 6 6-6 6" /></svg>;
  if (name === 'spark') return <svg {...common}><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" /></svg>;
  return <svg {...common}><path d="M20.5 3.5c-9-.3-15 3.2-16.3 9.1-1 4.9 1.9 8 6.2 7.4 6-1 10.5-7 10.1-16.5Z" /><path d="M5 20c3-6 7-10 13-13" /></svg>;
}

function Logo({ onClick }: { onClick?: () => void }) {
  return <a className="wordmark" href="#top" onClick={onClick} aria-label="RawKin, back to top">RawK<span className="wordmark-i">i</span>n<span className="wordmark-period">.</span></a>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => { if (event.key === 'Escape') { setActiveProduct(null); setMenuOpen(false); } };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);
  useEffect(() => {
    if (!activeProduct) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const dialog = document.querySelector<HTMLElement>('.product-dialog');
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', trapFocus);
    return () => { document.removeEventListener('keydown', trapFocus); previous?.focus(); };
  }, [activeProduct]);
  useEffect(() => {
    document.body.style.overflow = activeProduct || menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProduct, menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  return (
    <div id="top" className="site-shell">
      <div className="announcement"><span className="announcement-dot" /> Made by hand. Made in small batches. <span className="announcement-dot" /></div>
      <header className="site-header">
        <div className="container nav-content">
          <Logo onClick={closeMenu} />
          <nav aria-label="Main navigation" className="desktop-nav">
            <a href="#collection">The collection</a><a href="#philosophy">Our approach</a><a href="#ingredients">Ingredients</a><a href="#contact">Contact</a>
          </nav>
          <div className="nav-actions">
            <a className="header-enquiry" href={mailto('RawKin product enquiry')}>Enquire <Icon name="arrowUp" size={15} /></a>
            <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} size={23} /></button>
          </div>
        </div>
      </header>
      {menuOpen && <div className="mobile-menu"><nav aria-label="Mobile navigation"><a href="#collection" onClick={closeMenu}>The collection</a><a href="#philosophy" onClick={closeMenu}>Our approach</a><a href="#ingredients" onClick={closeMenu}>Ingredients</a><a href="#contact" onClick={closeMenu}>Contact</a></nav><p>Simple rituals, made with intention.</p></div>}

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-line" /> A SLOWER KIND OF SKINCARE</span>
              <h1 id="hero-title">A little more <em>nature.</em><br />A little more <em>you.</em></h1>
              <p>Thoughtfully handcrafted skincare, made in small batches for the everyday moments that feel like yours.</p>
              <a className="button button-primary" href="#collection">Explore the collection <Icon name="arrow" size={19} /></a>
              <div className="hero-signature"><Icon name="leaf" size={24} /><span>Made with care, not in a hurry.</span></div>
            </div>
            <div className="hero-visual" aria-label="RawKin handmade skincare product collection">
              <div className="hero-visual-blob" />
              <div className="hero-main-photo"><img src="./images/lookbook-jars.webp" alt="The two RawKin face-care jars photographed in the original brand display" fetchPriority="high" /></div>
              <div className="hero-floating-photo"><img loading="eager" src="./images/lookbook-balm.webp" alt="RawKin Matcha and Vanilla lip balm from the original display" /></div>
              <div className="hero-seal"><Icon name="spark" size={21} /><span>HANDMADE<br />IN SMALL<br />BATCHES</span></div>
              <div className="hero-img-caption">THE RAWKIN COLLECTION <span>— 001</span></div>
            </div>
          </div>
          <div className="hero-bottomline container"><span>01 / MADE WITH INTENTION</span><span>Scroll to explore <span aria-hidden="true">↓</span></span></div>
        </section>

        <section className="values-strip" aria-label="What makes RawKin different"><div className="container values-grid"><div><Icon name="leaf" size={25}/><span>Ingredient-led rituals</span></div><div><Icon name="spark" size={25}/><span>Handcrafted in small batches</span></div><div><span className="values-heart" aria-hidden="true">♡</span><span>Made for everyday care</span></div></div></section>

        <section className="collection section-pad" id="collection" aria-labelledby="collection-title">
          <div className="container">
            <div className="section-heading collection-heading"><div><span className="section-kicker">01 — THE COLLECTION</span><h2 id="collection-title">Three little <em>rituals.</em></h2></div><p>Not a hundred choices. Just a thoughtfully small collection of skincare essentials.</p></div>
            <div className="product-grid">
              {products.map((product, index) => <article className="product-card" key={product.id}>
                <button className={`product-media product-media-${index+1}`} onClick={() => setActiveProduct(product)} aria-label={`View details for ${product.subtitle} ${product.name}`}>
                  <img src={product.photo} alt={product.alt} loading="lazy" />
                  <span className="product-numeral">{product.number} / 03</span><span className="product-view">Discover <Icon name="arrowUp" size={17}/></span>
                </button>
                <div className="product-info"><span className="product-kicker">{product.category} <span>{product.size}</span></span><h3>{product.subtitle}<br /><strong>{product.name}</strong></h3><p>{product.note}</p><button className="text-link" onClick={() => setActiveProduct(product)}>Explore product <Icon name="arrow" size={18}/></button></div>
              </article>)}
            </div>
            <p className="collection-note">Product images are cropped from photographs of the original RawKin display. <a href="#contact">Ask us about availability <Icon name="arrowUp" size={13}/></a></p>
          </div>
        </section>

        <section className="story section-pad" id="philosophy" aria-labelledby="story-title">
          <div className="container story-grid">
            <div className="story-visual"><div className="story-photo"><img src="./images/real-scrub.webp" loading="lazy" alt="The actual RawKin Matcha and Chamomile scrub jar photographed by hand"/></div><div className="story-card"><span className="story-card-mark">R.</span><p>Good things<br />take a little<br /><em>time.</em></p></div></div>
            <div className="story-copy"><span className="section-kicker">02 — BEHIND THE BRAND</span><h2 id="story-title">There’s beauty<br />in <em>making slowly.</em></h2><p className="story-lead">Handmade is not an afterthought. It is the heart of RawKin.</p><p>We believe the everyday skincare routine can be a small ritual of care. That’s why RawKin keeps its collection considered and its process personal — with products crafted in small batches.</p><p>Nothing overly complicated. Just a more intentional way to approach the moments you take for yourself.</p><a href={mailto('I would like to learn more about the RawKin making process')} className="text-link">Get to know RawKin <Icon name="arrow" size={18}/></a></div>
          </div>
        </section>

        <section className="ingredients section-pad" id="ingredients" aria-labelledby="ingredients-title"><div className="container"><div className="ingredients-header"><span className="section-kicker">03 — INGREDIENT INSPIRATION</span><h2 id="ingredients-title">Inspired by the <em>botanical world.</em></h2><p>A closer look at the names behind the collection.</p></div><div className="ingredient-grid">
          <div className="ingredient"><span className="ingredient-icon ingredient-matcha">✳</span><span className="ingredient-index">01</span><h3>Matcha</h3><p>The green thread connecting all three RawKin creations.</p></div>
          <div className="ingredient"><span className="ingredient-icon ingredient-chamomile">✿</span><span className="ingredient-index">02</span><h3>Chamomile</h3><p>Floral inspiration for the calming face scrub.</p></div>
          <div className="ingredient"><span className="ingredient-icon ingredient-mint">❧</span><span className="ingredient-index">03</span><h3>Peppermint</h3><p>A refreshing botanical note in the clay mask.</p></div>
          <div className="ingredient"><span className="ingredient-icon ingredient-vanilla">✾</span><span className="ingredient-index">04</span><h3>Vanilla</h3><p>A soft, familiar note in the cooling lip balm.</p></div>
        </div></div></section>

        <section className="quote-band"><div className="container"><div className="quote-top"><Icon name="spark" size={25}/><span>THE RAWKIN WAY</span><Icon name="spark" size={25}/></div><p>Small batch. Thoughtful details.<br /><em>A moment that’s entirely yours.</em></p></div></section>

        <section className="faq section-pad" aria-labelledby="faq-title"><div className="container faq-grid"><div><span className="section-kicker">THE LITTLE DETAILS</span><h2 id="faq-title">Good to <em>know.</em></h2><p>Some answers before your first RawKin ritual.</p></div><div className="faq-questions">{[
          ['Are RawKin products handmade?', 'Yes. RawKin products are handmade in small batches, as confirmed by the brand owner.'],
          ['How can I place an order?', 'Use the email enquiry link to contact RawKin directly for current pricing, availability and delivery details. Online checkout has not yet been configured.'],
          ['Where can I see full ingredients and usage directions?', 'Check the physical product label. You can also email RawKin for the full ingredient list and advice on product suitability.'],
        ].map(([q,a],index) => <div className="faq-item" key={q}><button aria-expanded={openFaq===index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq===index ? null : index)}><span>{q}</span><span className="faq-symbol">{openFaq === index ? '−' : '+'}</span></button>{openFaq===index && <p id={`faq-answer-${index}`}>{a}</p>}</div>)}</div></div></section>

        <section className="contact-banner" id="contact"><div className="container contact-grid"><div><span className="section-kicker">READY FOR YOUR RAWKIN MOMENT?</span><h2>Let’s make it <em>personal.</em></h2><p>Questions about products, orders or ingredients? The RawKin team is an email away.</p></div><a className="button button-light" href={mailto('Hello RawKin — product enquiry')}>Say hello <Icon name="arrowUp" size={19}/></a></div></section>
      </main>
      <footer className="footer"><div className="container footer-top"><div><Logo /><p>Small-batch skincare, made with intention.</p></div><div className="footer-links"><a href="#collection">Collection</a><a href="#philosophy">Our approach</a><a href="#ingredients">Ingredients</a><a href="mailto:hellorawkin@gmail.com">Email us <Icon name="arrowUp" size={14}/></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} RawKin Essentials</span><span>Made with care · Panvel, Maharashtra</span><a href="#top">Back to top ↑</a></div></footer>

      {activeProduct && <div className="modal-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveProduct(null); }}><section className="product-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><button className="modal-close" aria-label="Close product details" autoFocus onClick={() => setActiveProduct(null)}><Icon name="close" size={22}/></button><div className="modal-image"><img src={activeProduct.photo} alt={activeProduct.alt}/></div><div className="modal-content"><span className="section-kicker">THE RAWKIN COLLECTION — {activeProduct.number} / 03</span><h2 id="dialog-title">{activeProduct.subtitle}<br/><em>{activeProduct.name}</em></h2><p className="dialog-note">{activeProduct.note}</p><div className="dialog-detail"><b>Size</b><span>{activeProduct.size}</span></div><div className="dialog-detail"><b>About this product</b><span>{activeProduct.details}</span></div><div className="dialog-detail"><b>How to use</b><span>{activeProduct.ritual}</span></div><a className="button button-primary dialog-button" href={mailto(`RawKin enquiry — ${activeProduct.subtitle} ${activeProduct.name}`)}>Enquire about this product <Icon name="arrow" size={18}/></a><p className="dialog-footnote">Pricing and availability are confirmed directly by RawKin. Patch test new skincare products and follow the packaging directions.</p></div></section></div>}
    </div>
  );
}
