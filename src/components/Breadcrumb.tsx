import Link from "next/link";
import { motion } from "framer-motion";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="breadcrumb"
    >
      <div className="container flex items-center">
        <motion.span whileHover={{ scale: 1.05 }}>
          <Link href="/" className="text-black hover:text-[var(--link-color)]">
            Trang chủ
          </Link>
        </motion.span>
        {items.map((item, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className="flex items-center"
          >
            <span className="mx-1 inline-block md:mx-2">&nbsp;/&nbsp;</span>
            {item.href ? (
              <motion.span whileHover={{ scale: 1.05 }}>
                <Link
                  href={item.href}
                  className="text-black hover:text-[var(--link-color)]"
                >
                  {item.label}
                </Link>
              </motion.span>
            ) : (
              <span className="text-gray-400">{item.label}</span>
            )}
          </motion.span>
        ))}
      </div>
    </motion.nav>
  );
}
