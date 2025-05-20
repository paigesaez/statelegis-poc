import { Link } from "react-router-dom"

export default function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link to="/" className="text-lg font-medium transition-colors hover:text-primary">
        StateLegis
      </Link>
      <Link to="/bills" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Bills
      </Link>
      <Link
        to="/representatives"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Representatives
      </Link>
    </nav>
  )
}
