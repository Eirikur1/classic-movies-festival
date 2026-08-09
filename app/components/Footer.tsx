export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-cinema-panel">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-white/60 md:px-8">
        {/* `grid` + `md:grid-cols-3` — stacks on mobile, three columns on tablets+. */}
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg text-cinema-gold">
              Reykjavík Classics
            </p>
            <p className="mt-2">
              A weekend of restored cinema in downtown Reykjavík.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white">Venue</p>
            <p>Bíó Paradís, Hverfisgata 54</p>
            <p>101 Reykjavík, Iceland</p>
          </div>
          <div>
            <p className="font-semibold text-white">Contact</p>
            <p>hello@reykjavikclassics.is</p>
            <p>+354 555 0123</p>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Reykjavík Classics Film Festival.
        </p>
      </div>
    </footer>
  );
}
