package com.multi.dahon.party.form;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PartyMemberUpdateForm {
	
	@Size(max = 1000, message ="1000글자를 넘을 수 없습니다.")
	private String introduction;

}
