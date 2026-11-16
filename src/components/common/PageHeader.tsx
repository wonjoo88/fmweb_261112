import { Fragment, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { findMenuPath } from '@/constants/menu'
import { DASHBOARD_URL } from '@/constants/urls'

export default function PageHeader({
  children,
  badge,
}: {
  children?: ReactNode
  badge?: ReactNode
}) {
  const { pathname } = useLocation()
  const trail = findMenuPath(pathname)
  const title = trail.at(-1)?.title

  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="space-y-1">
        <Breadcrumb>
          <BreadcrumbList className="text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={DASHBOARD_URL}>REVE</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {trail.map((item, i) => (
              <Fragment key={item.title}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {i === trail.length - 1 ? (
                    <BreadcrumbPage className="text-[#4f46e5]">{item.title}</BreadcrumbPage>
                  ) : (
                    <span>{item.title}</span>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center justify-start gap-3">
          {title && <h1 className="text-lg font-bold">{title}</h1>}
          {badge && <div className="flex items-center gap-1.5">{badge}</div>}
        </div>
      </div>
      {children && <div className="flex gap-2">{children}</div>}
    </div>
  )
}
