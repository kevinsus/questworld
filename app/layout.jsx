import '@/app/globals.css'

export const metadata = {
  title: "Quest World",
  descriptions: "An application for teenagers to help them learn programming" 
}

const RootLayout = async ({ children }) => {

  return (
    <html lang='en'>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout