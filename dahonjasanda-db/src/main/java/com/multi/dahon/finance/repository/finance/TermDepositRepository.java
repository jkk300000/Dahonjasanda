package com.multi.dahon.finance.repository.finance;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multi.dahon.finance.vo.RentHouseLoan;
import com.multi.dahon.finance.vo.TermDeposit;

public interface TermDepositRepository extends JpaRepository<TermDeposit, Long> {
}
