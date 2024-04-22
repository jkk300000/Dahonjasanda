package com.multi.dahon.finance.parsing;

import com.multi.dahon.finance.*;
import com.multi.dahon.finance.parsing.parsingForm.*;
import com.multi.dahon.finance.repository.finance.*;
import com.multi.dahon.finance.vo.AnnuitySaving;
import com.multi.dahon.finance.vo.AnnuitySavingOption;
import com.multi.dahon.finance.vo.CreditLoan;
import com.multi.dahon.finance.vo.CreditLoanOption;
import com.multi.dahon.finance.vo.FinancialCompany;
import com.multi.dahon.finance.vo.FinancialCompanyOption;
import com.multi.dahon.finance.vo.MortgageLoan;
import com.multi.dahon.finance.vo.MortgageLoanOption;
import com.multi.dahon.finance.vo.RentHouseLoan;
import com.multi.dahon.finance.vo.RentHouseLoanOption;
import com.multi.dahon.finance.vo.Saving;
import com.multi.dahon.finance.vo.SavingOption;
import com.multi.dahon.finance.vo.TermDeposit;
import com.multi.dahon.finance.vo.TermDepositOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class DBinjectionService {

    private final MortgageRepository mortgageRepositor;
    private final CreditRepository creditRepository;
    private final RentHouseRepository rentHouseRepository;
    private final FinancialCompanyRepository financialCompanyRepository;
    private final TermDepositRepository termDepositRepository;
    private final SavingRepository savingRepository;

    private final AnnuitySavingRepository annuitySavingRepository;


    @Autowired
    DBinjectionService(MortgageRepository mortgageRepositor, CreditRepository creditRepository,
                       RentHouseRepository rentHouseRepository, FinancialCompanyRepository financialCompanyRepository,
                       TermDepositRepository termDepositRepository, SavingRepository savingRepository,
                       AnnuitySavingRepository annuitySavingRepository) {
        this.mortgageRepositor = mortgageRepositor;
        this.creditRepository = creditRepository;
        this.rentHouseRepository = rentHouseRepository;
        this.financialCompanyRepository = financialCompanyRepository;
        this.termDepositRepository = termDepositRepository;
        this.savingRepository = savingRepository;
        this.annuitySavingRepository = annuitySavingRepository;
    }

    /**
     * company 시작
     */

    public void parsingAndSavingForCompany() {
        Map<String, Object> map = ApiParser.parsing(FinancialCompanyParsingForm.class, FinancialCompanyOptionParsingForm.class);

        List<FinancialCompany> financialCompanies = ((List<FinancialCompanyParsingForm>) map.get("target")).stream().map(t -> injectingTargetDTOForCompany(t)).toList();
        List<FinancialCompanyOption> financialCompanyOptions = ((List<FinancialCompanyOptionParsingForm>) map.get("option")).stream().map(o -> injectingOptionDTOForCompany(o)).toList();

        financialCompanies.forEach( t -> {
            financialCompanyOptions.stream().filter(o -> o.getFinCoNo().equals(t.getFinCoNo())).forEach(o -> o.setFinancialCompany(t));
            // 회사 저장을 먼저해야한다. 안그러면 회사가 영속성 컨텍스트에 등록이 안된상태에서 FK 를 걸려고해서 예외터짐
            financialCompanyRepository.save(t);

            mortgageRepositor.findAll().stream().filter(m -> m.getFinCoNo().equals(t.getFinCoNo())).forEach(m -> m.setFinancialCompany(t));
            creditRepository.findAll().stream().filter(c -> c.getFinCoNo().equals(t.getFinCoNo())).forEach(c -> c.setFinancialCompany(t));
            rentHouseRepository.findAll().stream().filter(r -> r.getFinCoNo().equals(t.getFinCoNo())).forEach(r -> r.setFinancialCompany(t));
            termDepositRepository.findAll().stream().filter(d -> d.getFinCoNo().equals(t.getFinCoNo())).forEach(d -> d.setFinancialCompany(t));
            savingRepository.findAll().stream().filter(s -> s.getFinCoNo().equals(t.getFinCoNo())).forEach(s -> s.setFinancialCompany(t));
            annuitySavingRepository.findAll().stream().filter(a -> a.getFinCoNo().equals(t.getFinCoNo())).forEach(a -> a.setFinancialCompany(t));

        });
    }

    private FinancialCompany injectingTargetDTOForCompany(FinancialCompanyParsingForm dto){
        return new FinancialCompany(dto.getDcls_month(), dto.getFin_co_no(), dto.getKor_co_nm(),
                dto.getDcls_chrg_man(), dto.getHomp_url(), dto.getCal_tel(), dto.getCompanyType());
    }


    private FinancialCompanyOption injectingOptionDTOForCompany(FinancialCompanyOptionParsingForm dto){
        return new FinancialCompanyOption(dto.getDcls_month(), dto.getFin_co_no(),
                dto.getArea_cd(), dto.getArea_nm(), dto.getExis_yn()
        );
    }



    /**
     * creditLoan 시작
     */

    public void parsingAndSavingForCredit() {
        Map<String, Object> map = ApiParser.parsing(CreditLoanParsingForm.class, CreditLoanOptionParsingForm.class);

        List<CreditLoan> creditLoans = ((List<CreditLoanParsingForm>) map.get("target")).stream().map(t -> injectingTargetDTOForCredit(t)).toList();
        List<CreditLoanOption> creditLoanOptions = ((List<CreditLoanOptionParsingForm>) map.get("option")).stream().map(o -> injectingOptionDTOForCredit(o)).toList();



        creditLoans.forEach( t -> {
            creditLoanOptions.stream().filter(o -> o.identifying().equals(t.identifying())).forEach(o -> o.setCreditLoan(t));
            creditRepository.save(t);
       });
    }

    private CreditLoan injectingTargetDTOForCredit(CreditLoanParsingForm dto){

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

        return new CreditLoan(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(), dto.getCrdt_prdt_type(),
                dto.getKor_co_nm(), dto.getFin_prdt_nm(), dto.getJoin_way(), dto.getCb_name(), dto.getCrdt_prdt_type_nm(),
                dcls_strt_day, dcls_end_day, fin_co_subm_day);
    }

    private CreditLoanOption injectingOptionDTOForCredit(CreditLoanOptionParsingForm dto){
        return new CreditLoanOption(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(),
                dto.getCrdt_prdt_type(), dto.getCrdt_lend_rate_type(), dto.getCrdt_lend_rate_type_nm(), dto.getCrdt_grad_1(),
                dto.getCrdt_grad_4(), dto.getCrdt_grad_5(), dto.getCrdt_grad_6(), dto.getCrdt_grad_10(), dto.getCrdt_grad_11(),
                dto.getCrdt_grad_12(), dto.getCrdt_grad_13(), dto.getCrdt_grad_avg()
               );
    }

    /**
     * RentalHouseLoan 시작
     */

    public void parsingAndSavingForRentalHouse() {
        Map<String, Object> map = ApiParser.parsing(RentHouseLoanParsingForm.class, RentHouseLoanOptionParsingForm.class);

        List<RentHouseLoan> rentHouseLoans = ((List<RentHouseLoanParsingForm>) map.get("target")).stream().map(t -> injectingTargetDTOForRentalHouse(t)).toList();
        List<RentHouseLoanOption> rentHouseLoanOptions = ((List<RentHouseLoanOptionParsingForm>) map.get("option")).stream().map(o -> injectingOptionDTOForRentalHouse(o)).toList();



        rentHouseLoans.forEach( t -> {
            rentHouseLoanOptions.stream().filter(o -> o.identifying().equals(t.identifying())).forEach(o -> o.setRentHouseLoan(t));
            rentHouseRepository.save(t);
       });
    }

    private RentHouseLoan injectingTargetDTOForRentalHouse(RentHouseLoanParsingForm dto){

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

        return new RentHouseLoan(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(), dto.getKor_co_nm(), dto.getFin_prdt_nm(),
                dto.getJoin_way(),dto.getLoan_inci_expn(), dto.getErly_rpay_fee(), dto.getDly_rate(), dto.getLoan_lmt(),
                dcls_strt_day, dcls_end_day, fin_co_subm_day);
    }

    private RentHouseLoanOption injectingOptionDTOForRentalHouse(RentHouseLoanOptionParsingForm dto){
        return new RentHouseLoanOption(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(),
               dto.getRpay_type(), dto.getRpay_type_nm(), dto.getLend_rate_type(), dto.getLend_rate_type_nm(),
                dto.getLend_rate_min(), dto.getLend_rate_max(), dto.getLend_rate_avg());
    }

    /**
     * moatgage 시작
     */
    public void parsingAndSavingMortgage() {
        Map<String, Object> map = ApiParser.parsing(MortgageParsingForm.class, MortgageOptionParsingForm.class);

        List<MortgageLoan> mortgageLoans = ((List<MortgageParsingForm>) map.get("target")).stream().map(t -> injectingTargetDTOForMortgage(t)).toList();
        List<MortgageLoanOption> mortgageLoanOptions = ((List<MortgageOptionParsingForm>) map.get("option")).stream().map(o -> injectingOptionDTOForMortgage(o)).toList();

       mortgageLoans.forEach( t -> {
           mortgageLoanOptions.stream().filter(o -> o.identifying().equals(t.identifying())).forEach(o -> o.setMortgageLoan(t));
           mortgageRepositor.save(t);
       });
    }

    private MortgageLoan injectingTargetDTOForMortgage(MortgageParsingForm dto){

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

    private MortgageLoanOption injectingOptionDTOForMortgage(MortgageOptionParsingForm dto){
        return new MortgageLoanOption(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(), dto.getMrtg_type(),
                dto.getMrtg_type(), dto.getRpay_type(), dto.getRpay_type_nm(), dto.getLend_rate_type(), dto.getLend_rate_type_nm(),
                dto.getLend_rate_min(), dto.getLend_rate_max(), dto.getLend_rate_avg());
    }

    /**
     * deposit 시작
     */

    public void parsingAndSavingDeposit() {
        Map<String, Object> map = ApiParser.parsing(DepositParsingForm.class, DepositOptionParsingForm.class);

        List<TermDeposit> deposits = ((List<DepositParsingForm>) map.get("target")).stream().map(t -> injectingTargetDTOForDeposit(t)).toList();
        List<TermDepositOption> depositOptions = ((List<DepositOptionParsingForm>) map.get("option")).stream().map(o -> injectingOptionDTOForDeposit(o)).toList();

        deposits.forEach( t -> {
            depositOptions.stream().filter(o -> o.identifying().equals(t.identifying())).forEach(o -> o.setTermDeposit(t));
            termDepositRepository.save(t);
       });
    }

    private TermDeposit injectingTargetDTOForDeposit(DepositParsingForm dto){

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

        return new TermDeposit(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(), dto.getKor_co_nm(),
                dto.getFin_prdt_nm(), dto.getJoin_way(), dto.getMtrt_int(), dto.getSpcl_cnd(), dto.getJoin_deny(),
                dto.getJoin_member(), dto.getEtc_note(), dto.getMax_limit(), dcls_strt_day, dcls_end_day, fin_co_subm_day);
    }

    private TermDepositOption injectingOptionDTOForDeposit(DepositOptionParsingForm dto){
        return new TermDepositOption(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(), dto.getIntr_rate_type(),
                dto.getIntr_rate_type_nm(), dto.getSave_trm(), dto.getIntr_rate(), dto.getIntr_rate2());
    }


    /**
     * Saving 시작
     */

    public void parsingAndSavingSaving() {
        Map<String, Object> map = ApiParser.parsing(SavingParsingForm.class, SavingOptionParsingForm.class);

        List<Saving> savings = ((List<SavingParsingForm>) map.get("target")).stream().map(t -> injectingTargetDTOForSaving(t)).toList();
        List<SavingOption> savingOptions = ((List<SavingOptionParsingForm>) map.get("option")).stream().map(o -> injectingOptionDTOForSaving(o)).toList();

        savings.forEach( t -> {
            savingOptions.stream().filter(o -> o.identifying().equals(t.identifying())).forEach(o -> o.setSaving(t));
            savingRepository.save(t);
       });
    }

    private Saving injectingTargetDTOForSaving(SavingParsingForm dto){

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

        return new Saving(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(), dto.getKor_co_nm(),
                dto.getFin_prdt_nm(), dto.getJoin_way(), dto.getMtrt_int(), dto.getSpcl_cnd(), dto.getJoin_deny(),
                dto.getJoin_member(), dto.getEtc_note(), dto.getMax_limit(), dcls_strt_day, dcls_end_day, fin_co_subm_day);
    }

    private SavingOption injectingOptionDTOForSaving(SavingOptionParsingForm dto){
        return new SavingOption(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(), dto.getIntr_rate_type(),
                dto.getIntr_rate_type_nm(), dto.getRsrv_type(), dto.getRsrv_type_nm(), dto.getSave_trm(),
                dto.getIntr_rate(), dto.getIntr_rate2());
    }



    /**
     * AnnuitySaving 시작
     */

    public void parsingAndSavingAnnuitySaving() {
        Map<String, Object> map = ApiParser.parsing(AnnuityParsingForm.class, AnnuityOptionParsingForm.class);

        List<AnnuitySaving> annuitySavings = ((List<AnnuityParsingForm>) map.get("target")).stream().map(t -> injectingTargetDTOForAnnuity(t)).toList();
        List<AnnuitySavingOption> annuitySavingOptions = ((List<AnnuityOptionParsingForm>) map.get("option")).stream().map(o -> injectingOptionDTOForAnnuity(o)).toList();

        annuitySavings.forEach( t -> {
            annuitySavingOptions.stream().filter(o -> o.identifying().equals(t.identifying())).forEach(o -> o.setAnnuitySaving(t));
            annuitySavingRepository.save(t);
       });
    }

    private AnnuitySaving injectingTargetDTOForAnnuity(AnnuityParsingForm dto){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");
        LocalDate sale_strt_day = null;
        LocalDate dcls_strt_day = null;
        LocalDate dcls_end_day = null;
        LocalDateTime fin_co_subm_day = null;

        if (dto.getSale_strt_day() != null) {
            sale_strt_day = LocalDate.parse(dto.getSale_strt_day(), formatter);
        }
        if(dto.getDcls_strt_day() != null) {
            dcls_strt_day = LocalDate.parse(dto.getDcls_strt_day(), formatter);
        }
        if(dto.getDcls_end_day() != null) {
            dcls_end_day = LocalDate.parse(dto.getDcls_end_day(), formatter);
        }
        if(dto.getFin_co_subm_day() != null) {
            fin_co_subm_day = LocalDateTime.parse(dto.getFin_co_subm_day(), timeFormatter);
        }

        return new AnnuitySaving(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(), dto.getKor_co_nm(), dto.getFin_prdt_nm(),
                dto.getJoin_way(), dto.getPnsn_kind(), dto.getPnsn_kind_nm(), sale_strt_day, dto.getMntn_cnt(), dto.getPrdt_type(),
                dto.getPrdt_type_nm(), dto.getAvg_prft_rate(), dto.getDcls_rate(), dto.getGuar_rate(), dto.getBtrm_prft_rate_1(),
                dto.getBtrm_prft_rate_2(), dto.getBtrm_prft_rate_3(), dto.getEtc(), dto.getSale_co(), dcls_strt_day, dcls_end_day,
                fin_co_subm_day);
    }

    private AnnuitySavingOption injectingOptionDTOForAnnuity(AnnuityOptionParsingForm dto){
        return new AnnuitySavingOption(dto.getDcls_month(), dto.getFin_co_no(), dto.getFin_prdt_cd(), dto.getPnsn_recp_trm(),
                dto.getPnsn_recp_trm_nm(), dto.getPnsn_entr_age(), dto.getPnsn_entr_age_nm(), dto.getMon_paym_atm(),
                dto.getMon_paym_atm_nm(), dto.getPaym_prd(), dto.getPaym_prd_nm(), dto.getPnsn_strt_age(), dto.getPnsn_strt_age_nm(),
                dto.getPnsn_recp_amt());
    }


}
