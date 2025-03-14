import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <nav className="breadcrumb">
        <div className="container">
          <span>
            <Link
              href="/"
              className="text-black hover:text-[var(--link-color)]"
            >
              Trang chủ
            </Link>
          </span>
          {items.map((item, index) => (
            <span key={index}>
              {index < items.length && (
                <span className="mx-1 inline-block md:mx-2">&nbsp;/&nbsp;</span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-black hover:text-[var(--link-color)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-400">{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </nav>
    </>
  );
}
