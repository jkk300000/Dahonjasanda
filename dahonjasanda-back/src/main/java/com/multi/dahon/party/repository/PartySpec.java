package com.multi.dahon.party.repository;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.multi.dahon.party.form.PartySearchCondition;
import com.multi.dahon.party.vo.Party;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;

public class PartySpec {

    public static Specification<Party> conditionalParty(PartySearchCondition condition) {
        String activityArea = condition.getActivityArea();
        String keyword = condition.getKeyword();
        List<String> categories = condition.getCategories();

        return (Specification<Party>) (party, query, builder) -> {

            Predicate predicate = builder.conjunction();

            if (StringUtils.hasText(keyword)) {
                predicate = builder.or(
                        builder.like(party.get("title"), "%" + keyword + "%"),
                        builder.like(party.get("categoryDetail"), "%" + keyword + "%"),
                        builder.like(party.get("category"), "%" + keyword + "%")
                );
            }

            if (StringUtils.hasText(activityArea)) {
                predicate = builder.and(predicate, builder.equal(party.get("activityArea"), activityArea));
            }

            if (categories != null && !categories.isEmpty()) {
                CriteriaBuilder.In<String> categoryCode = builder.in(party.get("category"));
                categories.forEach((category) -> categoryCode.value(category));
                predicate = builder.and(categoryCode, predicate);
            }
            return predicate;

        };
    }
}
