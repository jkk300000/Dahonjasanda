package com.multi.dahon.finance.repository.finance;

import org.springframework.data.jpa.repository.JpaRepository;

import com.multi.dahon.finance.vo.MortgageLoan;
import com.multi.dahon.finance.vo.RentHouseLoan;

public interface RentHouseRepository extends JpaRepository<RentHouseLoan, Long> {
}
