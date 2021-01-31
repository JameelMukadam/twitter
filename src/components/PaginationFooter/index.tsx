import React from 'react';
import { H3 } from '../Typography';
import { Container, PageItem } from './style';

type PaginationFooterProps = {
  maxPages: number;
  currentPage: number;
  onPageSelect: (pageNumber: number) => void;
};

function PaginationFooter({
  maxPages,
  currentPage,
  onPageSelect,
}: PaginationFooterProps) {
  const paginationItems = Array(maxPages)
    .fill('')
    .map((_, idx) => idx + 1);
  return (
    <Container>
      {paginationItems.map((page) => (
        <PageItem
          isSelected={currentPage === page}
          onClick={() => onPageSelect(page)}
        >
          <H3>{page}</H3>
        </PageItem>
      ))}
    </Container>
  );
}

export default PaginationFooter;
