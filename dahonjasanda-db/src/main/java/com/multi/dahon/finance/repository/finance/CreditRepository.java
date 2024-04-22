package com.multi.dahon.finance.repository.finance;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multi.dahon.finance.vo.CreditLoan;
import com.multi.dahon.finance.vo.MortgageLoan;

public interface CreditRepository  extends JpaRepository<CreditLoan, Long> {
}
