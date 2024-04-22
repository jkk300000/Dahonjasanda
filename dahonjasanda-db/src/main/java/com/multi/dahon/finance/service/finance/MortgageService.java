package com.multi.dahon.finance.service.finance;

import com.multi.dahon.finance.parsing.ApiParser;
import com.multi.dahon.finance.parsing.parsingForm.MortgageOptionParsingForm;
import com.multi.dahon.finance.parsing.parsingForm.MortgageParsingForm;
import com.multi.dahon.finance.repository.finance.MortgageRepository;
import com.multi.dahon.finance.vo.MortgageLoan;
import com.multi.dahon.finance.vo.MortgageLoanOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class MortgageService {

    private final MortgageRepository repository;

    @Autowired
    public MortgageService(MortgageRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void parsingAndSaving() {
        Map<String, Object> map = ApiParser.parsing(MortgageParsingForm.class, MortgageOptionParsingForm.class);

        List<MortgageLoan> mortgageLoans = ((List<MortgageParsingForm>) map.get("target")).stream().map(t -> injectingTargetDTO(t)).collect(Collectors.toList());
        List<MortgageLoanOption> mortgageLoanOptions = ((List<MortgageOptionParsingForm>) map.get("option")).stream().map(o -> injectingOptionDTO(o)).collect(Collectors.toList());

       mortgageLoans.forEach( t -> {
           mortgageLoanOptions.stream().filter(o -> o.identifying().equals(t.identifying())).forEach(o -> o.setMortgageLoan(t));
           repository.save(t);
       });

    }

    private static MortgageLoan injectingTargetDTO(MortgageParsingForm dto){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");
        LocalDate dcls_strt_day = null;
        LocalDate dcls_end_day = null;
        LocalDateTime fin_co_subm_day = null;

        if(dto.getDcls_strt_day() != null) {
            dcls_strt_day = LocalDate.parse(dto.getDcls_strt_day(), formatter);
        }
        if(dto.getDcls_end_day() != null) {
            dcls_end_day = LocalDate.parse(dto.getDcls_end_day(), formatter);
        }
        if(dto.getFin_co_subm_day() != null) {
            fin_co_subm_day = LocalDateTime.parse(dto.getFin_co_subm_day(), timeFormatter);
        }

        return new MortgageLoan(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(), dto.getKor_co_nm(), dto.getFin_prdt_nm(),
                dto.getJoin_way(),dto.getLoan_inci_expn(), dto.getErly_rpay_fee(), dto.getDly_rate(), dto.getLoan_lmt(),
                dcls_strt_day, dcls_end_day, fin_co_subm_day);

    }

    private static MortgageLoanOption injectingOptionDTO(MortgageOptionParsingForm dto){
        return new MortgageLoanOption(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(), dto.getMrtg_type(),
                dto.getMrtg_type(), dto.getRpay_type(), dto.getRpay_type_nm(), dto.getLend_rate_type(), dto.getLend_rate_type_nm(),
                dto.getLend_rate_min(), dto.getLend_rate_max(), dto.getLend_rate_avg());
    }




}
