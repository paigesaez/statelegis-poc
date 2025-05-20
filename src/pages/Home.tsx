export default function Home() {
  return (
    <div className="container space-y-8 py-8 md:py-12 lg:py-16">
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">U.S. Legislative Data Browser</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Search and browse legislative data from across the United States.
        </p>
      </section>

      <section className="mx-auto max-w-3xl">
        {/* Search bar will go here */}
        <div className="flex h-12 items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground">Search bar will be implemented here.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tighter">Recent Legislative Sessions</h2>
        <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground">Recent sessions will be implemented here.</p>
        </div>
      </section>
    </div>
  )
}
