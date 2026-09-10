'use client';

import React, { useState } from 'react';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: string) => void;
}

export const Pagination = ({
  total,
  page,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) => {
  const [jumpPageInput, setJumpPageInput] = useState('');
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleJump = () => {
    const p = parseInt(jumpPageInput);
    if (!isNaN(p) && p > 0 && p <= totalPages) {
      onPageChange(p);
      setJumpPageInput('');
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-6 py-4 text-muted-foreground">
      {/* 左侧：统计与配置 */}
      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-1">
          共 {total} 条记录
        </div>
        <Select value={limit.toString()} onValueChange={onLimitChange}>
          <SelectTrigger size="sm" className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">每页 10 条</SelectItem>
            <SelectItem value="20">每页 20 条</SelectItem>
            <SelectItem value="50">每页 50 条</SelectItem>
            <SelectItem value="100">每页 100 条</SelectItem>
          </SelectContent>
        </Select>
        <div>
          第 {page} / {totalPages} 页
        </div>
      </div>

      {/* 右侧：导航与跳转 */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon-sm" onClick={() => onPageChange(1)} disabled={page === 1}>
          <IconChevronsLeft size={18} />
        </Button>
        <Button variant="outline" size="icon-sm" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>
          <IconChevronLeft size={18} />
        </Button>
        <Button variant="outline" size="icon-sm" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
          <IconChevronRight size={18} />
        </Button>
        <Button variant="outline" size="icon-sm" onClick={() => onPageChange(totalPages)} disabled={page >= totalPages}>
          <IconChevronsRight size={18} />
        </Button>
        <div className="ml-1 flex items-center gap-1">
          <span className="text-sm">跳至</span>
          <Input
            type="text"
            className="h-7 w-14 text-center"
            value={jumpPageInput}
            onChange={(e) => setJumpPageInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleJump()}
          />
          <span className="text-sm">页</span>
        </div>
        <Button onClick={handleJump} className="px-5">
          GO
        </Button>
      </div>
    </div>
  );
};
