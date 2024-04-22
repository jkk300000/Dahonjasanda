package com.multi.dahon.finance.repository.finance;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multi.dahon.finance.vo.FinancialCompany;
import com.multi.dahon.finance.vo.MortgageLoan;

public interface FinancialCompanyRepository extends JpaRepository<FinancialCompany, Long> {
}
