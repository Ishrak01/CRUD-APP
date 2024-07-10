import Link from "next/link"
const Navbar = () => {
  return (
    <div className="flex sticky top-0 justify-between items-center p-3 mx-[120px] bg-blue-500 text-white rounded-md">
      <div className="font-bold"><Link href='/'>Daily Expense Tracker</Link></div>
      <div className="font-bold"><Link href='/Search'>Find By Title</Link></div>
      <div className="font-bold"><Link href='/Total'>Total Expenses</Link></div>
    </div>
  )
}

export default Navbar