// This script runs before the build to optimize the build process
// It can be added to the package.json scripts as "prebuild": "node scripts/optimize-build.js"

const fs = require("fs")
const path = require("path")

// Function to check and create necessary directories
function ensureDirectories() {
  const dirs = [".next", ".next/cache"]

  dirs.forEach((dir) => {
    const dirPath = path.join(process.cwd(), dir)
    if (!fs.existsSync(dirPath)) {
      console.log(`Creating directory: ${dir}`)
      fs.mkdirSync(dirPath, { recursive: true })
    }
  })
}

// Function to check environment variables
function checkEnvironmentVariables() {
  const requiredVars = ["VITE_LEGISCAN_API_KEY"]
  const missing = requiredVars.filter((v) => !process.env[v])

  if (missing.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missing.join(", ")}`)
    console.warn("The build will continue, but the application may not function correctly.")
  } else {
    console.log("✅ All required environment variables are set.")
  }
}

// Function to clean up unnecessary files before build
function cleanupFiles() {
  const filesToRemove = [
    ".next/cache/images", // Remove image cache to prevent stale images
  ]

  filesToRemove.forEach((file) => {
    const filePath = path.join(process.cwd(), file)
    if (fs.existsSync(filePath)) {
      console.log(`Removing: ${file}`)
      fs.rmSync(filePath, { recursive: true, force: true })
    }
  })
}

// Main function
function main() {
  console.log("🔧 Optimizing build environment...")

  try {
    ensureDirectories()
    checkEnvironmentVariables()
    cleanupFiles()

    console.log("✅ Build environment optimized successfully.")
  } catch (error) {
    console.error("❌ Error optimizing build environment:", error)
    // Don't exit with error to allow build to continue
  }
}

main()
