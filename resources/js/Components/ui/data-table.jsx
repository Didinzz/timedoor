import { useState } from "react";
import {
    flexRender, getCoreRowModel, getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel, useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
    FiSearch, FiSliders, FiInbox, FiPlusCircle, FiX,
    FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiChevronDown
} from "react-icons/fi";

export function DataTable({ columns, data, filterOptions = [] }) {
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [columnFilters, setColumnFilters] = useState([]);

    const table = useReactTable({
        data, columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { globalFilter, sorting, columnVisibility, columnFilters },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnFiltersChange: setColumnFilters,
    });

    const isFiltered = table.getState().columnFilters.length > 0 || globalFilter !== "";

    const renderFacetedFilter = (filterConfig) => {
        const column = table.getColumn(filterConfig.columnId);
        if (!column) return null;

        const selectedValues = new Set(column.getFilterValue() || []);

        const toggleValue = (value) => {
            const newSelected = new Set(selectedValues);
            if (newSelected.has(value)) newSelected.delete(value);
            else newSelected.add(value);

            const filterValues = Array.from(newSelected);
            column.setFilterValue(filterValues.length ? filterValues : undefined);
        };

        return (
            <DropdownMenu key={filterConfig.columnId}>
                <DropdownMenuTrigger className={buttonVariants({ variant: "outline", className: "h-10 border-dashed rounded-xl shadow-sm bg-background flex items-center px-4 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-muted/40 transition-colors cursor-pointer" })}>
                    <FiPlusCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{filterConfig.title}</span>
                    {selectedValues.size > 0 && (
                        <div className="ml-2 flex items-center gap-1">
                            <div className="h-4 w-px bg-border mx-1"></div>
                            <Badge variant="secondary" className="h-5 px-1.5 text-xs rounded-md shadow-none font-bold bg-secondary/80">
                                {selectedValues.size}
                            </Badge>
                        </div>
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-50 rounded-xl p-2 shadow-lg border-border/50">
                    <DropdownMenuLabel className="text-xs font-bold uppercase text-muted-foreground px-2 py-1.5">Filter {filterConfig.title}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-1" />
                    {filterConfig.options.map(option => (
                        <DropdownMenuCheckboxItem
                            key={option.value}
                            checked={selectedValues.has(option.value)}
                            onCheckedChange={() => toggleValue(option.value)}
                            className="cursor-pointer py-2.5 rounded-lg font-medium"
                        >
                            {option.label}
                        </DropdownMenuCheckboxItem>
                    ))}
                    {selectedValues.size > 0 && (
                        <>
                            <DropdownMenuSeparator className="my-1" />
                            <DropdownMenuItem
                                className="justify-center text-center cursor-pointer py-2 text-muted-foreground font-medium rounded-lg"
                                onSelect={() => column.setFilterValue(undefined)}
                            >
                                Hapus Filter
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    return (
        <div className="space-y-4">
            {/* TOOLBAR PROFESIONAL */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                {/* 1. BAGIAN KIRI: Cari & Filter */}
                <div className="flex flex-1 items-center space-x-3 w-full overflow-x-auto pb-1 md:pb-0">
                    <div className="flex items-center relative max-w-sm w-full md:w-auto">
                        <FiSearch className="absolute left-3.5 text-muted-foreground w-4 h-4" />
                        {/* 👇 ANTI-BUG PADA SEARCH INPUT */}
                        <Input
                            placeholder="Cari..."
                            value={globalFilter ?? ""}
                            onChange={(event) => setGlobalFilter(String(event.target.value))}
                            className="pl-10 h-10 rounded-xl border-border bg-background shadow-sm w-full focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-border focus:bg-muted/40 transition-colors"
                        />
                    </div>

                    {filterOptions.map(filter => renderFacetedFilter(filter))}

                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setGlobalFilter("");
                                table.resetColumnFilters();
                            }}
                            className="h-10 px-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        >
                            Reset <FiX className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* 2. BAGIAN KANAN: Jumlah Baris & Visibilitas Kolom */}
                <div className="flex items-center space-x-3 w-full md:w-auto shrink-0">

                    <div className="flex items-center space-x-2">
                        <DropdownMenu>
                            {/* 👇 ANTI-BUG */}
                            <DropdownMenuTrigger className={buttonVariants({ variant: "outline", className: "h-10 border-border shadow-sm px-3 gap-2 rounded-xl bg-background focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-muted/40 transition-colors cursor-pointer" })}>
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground hidden sm:block hover:text-foreground transition-colors">
                                    Tampilkan
                                </span>
                                <span className="font-semibold text-foreground">{table.getState().pagination.pageSize}</span>
                                <FiChevronDown className="h-4 w-4 text-muted-foreground" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-20 rounded-xl shadow-lg border-border/50 p-1.5">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <DropdownMenuItem
                                        key={pageSize}
                                        className="justify-center cursor-pointer rounded-lg font-bold py-2"
                                        onSelect={() => table.setPageSize(pageSize)}
                                    >
                                        {pageSize}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Fitur Tampilan Kolom */}
                    <DropdownMenu>
                        {/* 👇 ANTI-BUG */}
                        <DropdownMenuTrigger className={buttonVariants({ variant: "outline", className: "ml-auto rounded-xl border-border shadow-sm h-10 px-4 bg-background focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-muted/40 transition-colors cursor-pointer" })}>
                            <FiSliders className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="hidden sm:inline-block font-medium">Kolom</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl w-44 shadow-lg p-2 border-border/50">
                            <DropdownMenuLabel className="text-xs font-bold tracking-wider uppercase text-muted-foreground px-2 py-1.5">Atur Tampilan</DropdownMenuLabel>
                            <DropdownMenuSeparator className="my-1" />
                            {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize cursor-pointer py-2 rounded-lg font-medium"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* TABEL UTAMA */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden max-h-125 overflow-y-auto relative shadow-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                <Table>
                    <TableHeader className="bg-muted/40 border-b border-border sticky top-0 z-10 outline outline-border">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-foreground/80 h-12 px-4 whitespace-nowrap">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="hover:bg-muted/30 transition-colors border-b border-border/50 last:border-none">
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-4 px-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-56 text-center">
                                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                                        <div className="p-4 bg-muted/50 rounded-full mb-3">
                                            <FiInbox className="w-8 h-8 opacity-40" />
                                        </div>
                                        <p className="font-semibold text-foreground/80">Data tidak ditemukan</p>
                                        <p className="text-sm opacity-80 mt-1">Coba ubah kata kunci atau hapus filter Anda.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* PAGINASI (TETAP SAMA) */}
            <div className="flex items-center justify-between px-2 pt-2">
                <span className="text-sm text-muted-foreground font-medium hidden sm:block">
                    Total <strong className="text-foreground">{table.getFilteredRowModel().rows.length}</strong> data.
                </span>

                <div className="flex items-center space-x-4 sm:space-x-6 ml-auto">
                    <div className="flex w-25 items-center justify-center text-sm font-semibold text-foreground/80">
                        Hal {table.getState().pagination.pageIndex + 1} dari {table.getPageCount() || 1}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="hidden h-9 w-9 p-0 lg:flex rounded-lg shadow-sm border-border text-foreground hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <FiChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-9 w-9 p-0 rounded-lg shadow-sm border-border text-foreground hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <FiChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-9 w-9 p-0 rounded-lg shadow-sm border-border text-foreground hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <FiChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-9 w-9 p-0 lg:flex rounded-lg shadow-sm border-border text-foreground hover:bg-muted focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <FiChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}