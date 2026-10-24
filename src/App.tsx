import { useEffect, useState, type FormEvent } from 'react';

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
    alt: 'RawKin Matcha and Chamomile Calming Face Scrub jar shown in a styled botanical studio photograph',
    note: 'A little moment to reset your skincare ritual.',
    ritual: 'Apply a small amount to damp skin, gently massage in circular motions and rinse with water, as directed on the product label.',
    details: 'The ingredient label lists glycerin, jojoba oil, matcha powder, chamomile extract and sugar, among other ingredients.',
  },
  {
    id: 'peppermint-mask', number: '02', subtitle: 'MATCHA + PEPPERMINT',
    name: 'Detoxifying Clay Mask', category: 'THE WEEKLY RITUAL', size: '100 g',
    photo: './images/mask.webp',
    alt: 'RawKin Matcha and Peppermint Detoxifying Clay Mask jar shown in a styled botanical studio photograph',
    note: 'An invitation to make time for yourself.',
    ritual: 'Follow the directions on your product label. For any ingredient or suitability questions, contact RawKin before use.',
    details: 'A matcha and peppermint clay-mask concept, as named on the original packaging. Full formulation details are available from the maker.',
  },
  {
    id: 'vanilla-balm', number: '03', subtitle: 'MATCHA + VANILLA',
    name: 'Cooling Lip Balm', category: 'THE EVERYDAY ESSENTIAL', size: '5 g',
    photo: './images/lip-balm.webp',
    alt: 'RawKin Matcha and Vanilla Cooling Lip Balm tube shown in a styled botanical studio photograph',
    note: 'The smallest ritual, ready to travel with you.',
    ritual: 'Use as directed on the product label. Ask RawKin if you have questions about ingredients or suitability.',
    details: 'A matcha and vanilla lip balm as shown in a styled botanical studio photograph.',
  },
];

const INSTAGRAM_URL = 'https://www.instagram.com/rawkin.in/';

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

function ContactPage() {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState('Product enquiry');
  const [message, setMessage] = useState('');

  function openEmailDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `RawKin — ${enquiryType}`;
    const body = [
      `Name: ${senderName.trim()}`,
      `Email: ${senderEmail.trim()}`,
      `Enquiry: ${enquiryType}`,
      '',
      message.trim(),
    ].join('\n');
    window.location.href = `mailto:hellorawkin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="contact-page" id="main-content">
      <section className="contact-page-hero">
        <div className="container contact-page-hero-grid">
          <div className="contact-page-lead">
            <span className="section-kicker">WE'D LOVE TO HEAR FROM YOU</span>
            <h1>Let's talk <em>RawKin.</em></h1>
            <p>Questions about a product, your next small-batch ritual, or a possible collaboration? Reach out. There’s a real person behind the brand.</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="button button-primary">Order via Instagram <Icon name="arrowUp" size={18} /></a>
            <span className="contact-page-hint">Opens @rawkin.in. Message RawKin there to discuss your order.</span>
          </div>
          <div className="contact-page-photo">
            <img src="./images/lookbook-jars.webp" alt="RawKin handcrafted face scrub and clay mask in a botanical studio setting" />
            <span className="contact-photo-stamp">SLOWLY MADE · THOUGHTFULLY SHARED</span>
          </div>
        </div>
      </section>

      <section className="contact-page-details section-pad" aria-labelledby="contact-details-heading">
        <div className="container contact-page-columns">
          <div className="contact-methods">
            <span className="section-kicker">A NOTE FROM YOU</span>
            <h2 id="contact-details-heading">Every good ritual starts with a <em>conversation.</em></h2>
            <p>We’re happy to help with product questions, ingredient information, current availability and collaborations.</p>
            <a className="contact-method" href="mailto:hellorawkin@gmail.com">
              <span className="contact-method-icon"><Icon name="mail" size={24}/></span>
              <span><small>EMAIL RAWKIN</small><strong>hellorawkin@gmail.com</strong><em>For product questions and enquiries</em></span>
              <Icon name="arrowUp" size={19}/>
            </a>
            <a className="contact-method" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <span className="contact-method-icon"><Icon name="spark" size={23}/></span>
              <span><small>ORDER & CONNECT</small><strong>@rawkin.in</strong><em>Visit our Instagram profile to enquire about orders</em></span>
              <Icon name="arrowUp" size={19}/>
            </a>
            <div className="contact-page-note"><Icon name="leaf" size={24}/><span>Handcrafted in small batches<br/>Panvel, Maharashtra, India</span></div>
          </div>
          <div className="contact-form-wrap">
            <span className="section-kicker">SEND AN ENQUIRY</span>
            <h3>Write us a note.</h3>
            <p>Fill this out and we’ll prepare an email you can send from your device.</p>
            <form onSubmit={openEmailDraft} className="contact-form">
              <label htmlFor="sender-name">Your name</label>
              <input id="sender-name" name="name" value={senderName} onChange={(event) => setSenderName(event.target.value)} required maxLength={100} autoComplete="name" placeholder="Your full name" />
              <label htmlFor="sender-email">Email address</label>
              <input id="sender-email" name="email" type="email" value={senderEmail} onChange={(event) => setSenderEmail(event.target.value)} required autoComplete="email" placeholder="you@example.com" />
              <label htmlFor="enquiry-type">What can we help with?</label>
              <select id="enquiry-type" name="topic" value={enquiryType} onChange={(event) => setEnquiryType(event.target.value)}>
                <option>Product enquiry</option><option>Order support</option><option>Ingredients & suitability</option><option>Collaboration</option><option>Other question</option>
              </select>
              <label htmlFor="enquiry-message">Your message</label>
              <textarea id="enquiry-message" name="message" rows={5} maxLength={4000} required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell us what’s on your mind…" />
              <button type="submit" className="button button-primary">Prepare email <Icon name="arrow" size={18}/></button>
              <p className="contact-form-footnote">No message is submitted to a server. This button opens your email app; review and send the draft there.</p>
            </form>
          </div>
        </div>
      </section>
      <section className="contact-page-outro"><div className="container"><span className="section-kicker">A LITTLE MORE NATURE, A LITTLE MORE YOU</span><h2>Made with care. <em>Shared with you.</em></h2><a href="#collection" className="text-link">Explore our three rituals <Icon name="arrow" size={18}/></a></div></section>
    </main>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactRoute, setContactRoute] = useState(() => typeof window !== 'undefined' && window.location.hash === '#/contact');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      const isContact = hash === '#/contact';
      setContactRoute(isContact);
      setMenuOpen(false);
      setActiveProduct(null);
      if (isContact) {
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#') && hash.length > 1) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' });
        }));
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.title = contactRoute ? 'Contact RawKin | Handmade Skincare' : 'RawKin | Handmade Small-Batch Skincare';
  }, [contactRoute]);

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
            <a href="#collection">The collection</a><a href="#philosophy">Our approach</a><a href="#ingredients">Ingredients</a><a href="#/contact">Contact</a>
          </nav>
          <div className="nav-actions">
            <a className="header-enquiry" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Order on Instagram <Icon name="arrowUp" size={15} /></a>
            <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} size={23} /></button>
          </div>
        </div>
      </header>
      {menuOpen && <div className="mobile-menu"><nav aria-label="Mobile navigation"><a href="#collection" onClick={closeMenu}>The collection</a><a href="#philosophy" onClick={closeMenu}>Our approach</a><a href="#ingredients" onClick={closeMenu}>Ingredients</a><a href="#/contact" onClick={closeMenu}>Contact</a></nav><p>Simple rituals, made with intention.</p></div>}

      {contactRoute ? <ContactPage /> : <main>
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
              <div className="hero-main-photo"><img src="./images/lookbook-jars.webp" alt="Two RawKin face-care jars in a styled botanical studio photograph" fetchPriority="high" /></div>
              <div className="hero-floating-photo"><img loading="eager" src="./images/lookbook-balm.webp" alt="RawKin Matcha and Vanilla lip balm in a styled botanical studio photograph" /></div>
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
                <div className="product-info"><span className="product-kicker">{product.category} <span>{product.size}</span></span><h3>{product.subtitle}<br /><strong>{product.name}</strong></h3><p>{product.note}</p><div className="product-actions"><button className="text-link" onClick={() => setActiveProduct(product)}>Explore product <Icon name="arrow" size={18}/></button><a className="product-order" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={`Order ${product.subtitle} ${product.name} on RawKin Instagram`}>Order on Instagram <Icon name="arrowUp" size={16}/></a></div></div>
              </article>)}
            </div>
            <p className="collection-note">Images are styled digital product visuals. Packaging details may differ from the physical product. <a href="#/contact">Ask us about availability <Icon name="arrowUp" size={13}/></a></p>
          </div>
        </section>

        <section className="story section-pad" id="philosophy" aria-labelledby="story-title">
          <div className="container story-grid">
            <div className="story-visual"><div className="story-photo"><img src="./images/real-scrub.webp" loading="lazy" alt="RawKin Matcha and Chamomile face scrub in a styled botanical studio photograph"/></div><div className="story-card"><span className="story-card-mark">R.</span><p>Good things<br />take a little<br /><em>time.</em></p></div></div>
            <div className="story-copy"><span className="section-kicker">02 — BEHIND THE BRAND</span><h2 id="story-title">There’s beauty<br />in <em>making slowly.</em></h2><p className="story-lead">Handmade is not an afterthought. It is the heart of RawKin.</p><p>We believe the everyday skincare routine can be a small ritual of care. That’s why RawKin keeps its collection considered and its process personal — with products crafted in small batches.</p><p>Nothing overly complicated. Just a more intentional way to approach the moments you take for yourself.</p><a href="#/contact" className="text-link">Get to know RawKin <Icon name="arrow" size={18}/></a></div>
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
          ['How can I place an order?', 'Choose Order on Instagram to visit @rawkin.in, then message RawKin with the product you want. Pricing, payment, availability and delivery can be confirmed directly with the brand.'],
          ['Where can I see full ingredients and usage directions?', 'Check the physical product label. You can also email RawKin for the full ingredient list and advice on product suitability.'],
        ].map(([q,a],index) => <div className="faq-item" key={q}><button aria-expanded={openFaq===index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq===index ? null : index)}><span>{q}</span><span className="faq-symbol">{openFaq === index ? '−' : '+'}</span></button>{openFaq===index && <p id={`faq-answer-${index}`}>{a}</p>}</div>)}</div></div></section>

        <section className="contact-banner"><div className="container contact-grid"><div><span className="section-kicker">READY FOR YOUR RAWKIN MOMENT?</span><h2>Let’s make it <em>personal.</em></h2><p>Questions about products, orders or ingredients? The RawKin team is just a message away.</p></div><a className="button button-light" href="#/contact">Contact us <Icon name="arrowUp" size={19}/></a></div></section>
      </main>}
      <footer className="footer"><div className="container footer-top"><div><Logo /><p>Small-batch skincare, made with intention.</p></div><div className="footer-links"><a href="#collection">Collection</a><a href="#philosophy">Our approach</a><a href="#ingredients">Ingredients</a><a href="#/contact">Contact us <Icon name="arrowUp" size={14}/></a><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram <Icon name="arrowUp" size={14}/></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} RawKin Essentials</span><span>Made with care · Panvel, Maharashtra</span><a href="#top">Back to top ↑</a></div></footer>

      {activeProduct && <div className="modal-scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveProduct(null); }}><section className="product-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><button className="modal-close" aria-label="Close product details" autoFocus onClick={() => setActiveProduct(null)}><Icon name="close" size={22}/></button><div className="modal-image"><img src={activeProduct.photo} alt={activeProduct.alt}/></div><div className="modal-content"><span className="section-kicker">THE RAWKIN COLLECTION — {activeProduct.number} / 03</span><h2 id="dialog-title">{activeProduct.subtitle}<br/><em>{activeProduct.name}</em></h2><p className="dialog-note">{activeProduct.note}</p><div className="dialog-detail"><b>Size</b><span>{activeProduct.size}</span></div><div className="dialog-detail"><b>About this product</b><span>{activeProduct.details}</span></div><div className="dialog-detail"><b>How to use</b><span>{activeProduct.ritual}</span></div><a className="button button-primary dialog-button" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Order on Instagram <Icon name="arrowUp" size={18}/></a><p className="dialog-footnote">Instagram opens the RawKin profile; orders are arranged by message. Pricing and availability are confirmed directly by RawKin. Patch test new skincare products and follow the packaging directions.</p></div></section></div>}
    </div>
  );
}