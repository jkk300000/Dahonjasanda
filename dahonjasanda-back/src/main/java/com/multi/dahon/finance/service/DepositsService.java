package com.multi.dahon.finance.service;

import java.util.Optional;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.multi.dahon.finance.dto.AnnuitySavingOptionAndProdDTO;
import com.multi.dahon.finance.dto.FinanceCompanyDTO;
import com.multi.dahon.finance.dto.SavingOptionAndProdDTO;
import com.multi.dahon.finance.dto.TermDepositOptionAndProdDTO;
import com.multi.dahon.finance.repository.AnnuitySavingRepository;
import com.multi.dahon.finance.repository.DepositSpec;
import com.multi.dahon.finance.repository.FinancialCompanyRepository;
import com.multi.dahon.finance.repository.SavingRepository;
import com.multi.dahon.finance.repository.TermDepositRepository;
import com.multi.dahon.finance.vo.DepositsParam;

/**
 * JPA 에서 엔티티에 뭔가 변경하거나 할떄는
 * 무조건 @Transactional  안에서 해야합니다.
 * 그래야 영속성 컨텍스트에서 변경감지를 해서 업데이트된걸
 * 자동으로 쿼리쳐서 날려줍니다.
 * 예) @Transactional 밖 Controller 쪽에서 엔티티에 값을 바꿔도
 * 아무 일도 일어나지 않습니다.
 */
@Service
public class DepositsService {

	private final TermDepositRepository termDepositRepository;
    private final SavingRepository savingRepository;
    private final AnnuitySavingRepository annuitySavingRepository;
    private final FinancialCompanyRepository financialCompanyRepository;

    @Autowired
    public DepositsService(TermDepositRepository termDepositRepository, SavingRepository savingRepository,
    		AnnuitySavingRepository annuitySavingRepository, FinancialCompanyRepository financialCompanyRepository) {
        super();
        this.termDepositRepository = termDepositRepository;
    	this.savingRepository = savingRepository;
    	this.annuitySavingRepository = annuitySavingRepository;
    	this.financialCompanyRepository = financialCompanyRepository;
    }

    
    
    public Vector<FinanceCompanyDTO> getFinanceCompanyList(String companyType){
    	return financialCompanyRepository.findByType(companyType);
    }
    
    public Page<TermDepositOptionAndProdDTO> findTermDepositList(DepositsParam param, Pageable pageable){
    	return termDepositRepository.findAll(DepositSpec.conditionalTermDeposit(param), pageable).map(TermDepositOptionAndProdDTO::new);
    }
    
    public Page<SavingOptionAndProdDTO> findSavingList(DepositsParam param, Pageable pageable){
		return savingRepository.findAll(DepositSpec.conditionalSavings(param), pageable).map(SavingOptionAndProdDTO::new);
	}
	
	public Page<AnnuitySavingOptionAndProdDTO> findAnnuitySavingList(DepositsParam param, Pageable pageable){
		return annuitySavingRepository.findAll(DepositSpec.conditionalAnnuitySaving(param), pageable).map(AnnuitySavingOptionAndProdDTO::new);
	}
	
	public Optional<SavingOptionAndProdDTO> getSavingDetail(Long id){
		return savingRepository.findSavingWithDetail(id);
	}
	
	public Optional<TermDepositOptionAndProdDTO> getTermDepositDetail(Long id){
		return termDepositRepository.findTermDepositWithDetail(id);
	}
	
	public Optional<AnnuitySavingOptionAndProdDTO> getAnnuitySavingDetail(Long id){
		return annuitySavingRepository.findAnnuitySavingWithDetail(id);
	}
	
	public Page<SavingOptionAndProdDTO> findTopInterestRateSavings(Pageable pageable){
	    // Repository 메소드가 이미 DTO 객체를 반환하므로, map 변환 과정은 필요 없음
	    return savingRepository.findTopInterestRateSavings(pageable);
	}

	public Page<TermDepositOptionAndProdDTO> findTopInterestRateTermDeposits(Pageable pageable){
	    // Repository 메소드가 이미 DTO 객체를 반환하므로, map 변환 과정은 필요 없음
	    return termDepositRepository.findTopInterestRateTermDeposits(pageable);
	}
}
