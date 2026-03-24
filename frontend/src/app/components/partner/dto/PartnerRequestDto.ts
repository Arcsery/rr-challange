import {QualificationType} from '../../enums/QualificationType';
import {PartnerStatus} from '../../enums/PartnerStatus';

export interface PartnerRequestDto {
  version: number | null;
  name: string;
  taxNumber: string;
  headquarters: string;
  status: PartnerStatus;
  qualifications: QualificationType[];
}
