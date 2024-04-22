-- drop schema if exists training;
create schema training;
use training;

-- select --------------------

select * from mortgage_loan;
select * from mortgage_loan_option;
select * from rent_house_loan;
select * from rent_house_loan_option;
select * from credit_loan;
select * from credit_loan_option;
select * from financial_company;
select * from financial_company_option;
select * from term_deposit;
select * from term_deposit_option;
select * from saving;
select * from saving_option;
select * from annuity_saving;
select * from annuity_saving_option;

-- join -------------------------

select * 
from mortgage_loan m
join mortgage_loan_option mo
on m.id = mo.mortgage_loan_id;

select *
from rent_house_loan r
join rent_house_loan_option o
on r.id = o.rent_house_loan_id;

select *
from credit_loan c
join credit_loan_option co
on c.id = co.credit_loan_id;

select *
from term_deposit t
join term_deposit_option o
on t.id = o.term_deposit_id;

select *
from saving s
join saving_option o
on s.id = o.saving_id;

select *
from annuity_saving a
join annuity_saving_option o
on a.id = o.annuity_saving_id;

select *
from financial_company f
join financial_company_option o
on f.id = o.financial_company_id;

-- count -----------------------

select count(*) from mortgage_loan;
select count(*) from mortgage_loan_option;
select count(*) from rent_house_loan;
select count(*) from rent_house_loan_option;
select count(*) from credit_loan;
select count(*) from credit_loan_option;
select count(*) from financial_company;
select count(*) from financial_company_option;
select count(*) from term_deposit;
select count(*) from term_deposit_option;
select count(*) from saving;
select count(*) from saving_option;
select count(*) from annuity_saving;
select count(*) from annuity_saving_option;


-- delete ------------ 

-- delete from annuity_saving_option;
-- delete from saving_option;
-- delete from term_deposit_option;
-- delete from mortgage_loan_option;
-- delete from rent_house_loan_option;
-- delete from financial_company_option;
-- delete from credit_loan_option;
-- delete from credit_loan;
-- delete from rent_house_loan;
-- delete from mortgage_loan;
-- delete from term_deposit;
-- delete from saving;
-- delete from annuity_saving;
-- delete from financial_company;

-- -- drop 문  테이블에 문제생겼을때 위에서 부터 지우면 됨 -------------

-- drop table annuity_saving_option;
-- drop table saving_option;
-- drop table term_deposit_option;
-- drop table mortgage_loan_option;
-- drop table rent_house_loan_option;
-- drop table financial_company_option;
-- drop table credit_loan_option;
-- drop table credit_loan;
-- drop table rent_house_loan;
-- drop table mortgage_loan;
-- drop table term_deposit;
-- drop table saving;
-- drop table annuity_saving;
-- drop table financial_company;