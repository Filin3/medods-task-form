<template>
  <div class="customer-form-document">
    <v-select
      label="Тип документа"
      v-model="$v.documentType.$model"
      :required="true"
      :data="documentTypes"
      :error="$v.documentType.$error"
    />
    <v-input
      label="Серия"
      :placeholder="currentDocumentPlaceholders.documentSeriesPlaceholder"
      v-model="$v.documentSeries.$model"
      :error="$v.documentSeries.$error"
    />
    <v-input
      label="Номер"
      :placeholder="currentDocumentPlaceholders.documentNumberPlaceholder"
      v-model="$v.documentNumber.$model"
      :error="$v.documentNumber.$error"
    />
    <v-input
      label="Кем выдан"
      :placeholder="currentDocumentPlaceholders.issuedBy"
      v-model="$v.issuedBy.$model"
      :error="$v.issuedBy.$error"
    />
    <v-input
      type="date"
      label="Дата выдачи"
      v-model="$v.dateOfIssue.$model"
      :required="true"
      :error="$v.dateOfIssue.$error"
    />
  </div>
</template>

<script lang="ts">
import { required, minLength, maxLength, integer } from "vuelidate/lib/validators";
import { sentencesRU, seriesOfBirthCertificate, trafficPoliceOfficeNumber } from "@/utils";
import Vue from "vue";
import VInput from "./VInput.vue";
import VSelect from "./VSelect.vue";

interface IDocumentPlaceholder {
  name: string;
  documentSeriesPlaceholder: string;
  documentNumberPlaceholder: string;
  issuedBy: string;
}

export default Vue.extend({
  name: "CustomerFormDocument",
  components: {
    VInput,
    VSelect
  },
  data() {
    return {
      documentsPlaceholders: [
        {
          name: "Паспорт",
          documentSeriesPlaceholder: "1234",
          documentNumberPlaceholder: "123456",
          issuedBy: "УФМС РОССИИ ПО ГОР. МОСКВА"
        },
        {
          name: "Свидетельство о рождении",
          documentSeriesPlaceholder: "III-АА",
          documentNumberPlaceholder: "123456",
          issuedBy: "Зеленоградский отдел ЗАГС Управления ЗАГС Москвы"
        },
        {
          name: "Вод. удостоверение",
          documentSeriesPlaceholder: "1234",
          documentNumberPlaceholder: "123456",
          issuedBy: "ГИБДД 1234"
        }
      ] as IDocumentPlaceholder[],
      documentType: [] as string[],
      documentSeries: "",
      documentNumber: "",
      issuedBy: "",
      dateOfIssue: ""
    };
  },
  computed: {
    isValid(): boolean {
      return !this.$v.$invalid;
    },
    documentTypes(): string[] {
      return this.documentsPlaceholders.map((cur) => cur.name);
    },
    currentDocumentPlaceholders(): Omit<IDocumentPlaceholder, "name"> {
      const result: Omit<IDocumentPlaceholder, "name"> = {
        documentSeriesPlaceholder: "",
        documentNumberPlaceholder: "",
        issuedBy: ""
      };

      this.documentsPlaceholders.some((cur) => {
        const condition = this.documentType[0] === cur.name;
        if (condition) {
          result.documentSeriesPlaceholder = cur.documentSeriesPlaceholder;
          result.documentNumberPlaceholder = cur.documentNumberPlaceholder;
          result.issuedBy = cur.issuedBy;
        }
        return condition;
      });

      return result;
    }
  },
  watch: {
    isValid(value: boolean) {
      this.$emit("is-valid", value);
    }
  },
  validations() {
    const document = this.documentType[0];

    const rules = {
      documentType: {
        required
      },
      dateOfIssue: {
        required,
        maxValue: (value: string) => new Date(value) <= new Date()
      },
      documentSeries: {},
      documentNumber: {},
      issuedBy: {}
    };

    if (document === "Паспорт") {
      Object.assign(rules, {
        documentSeries: {
          integer,
          minLength: minLength(4),
          maxLength: maxLength(4)
        },
        documentNumber: {
          integer,
          minLength: minLength(6),
          maxLength: maxLength(6)
        },
        issuedBy: {
          sentencesRU,
          minLength: minLength(10),
          maxLength: maxLength(100)
        }
      });
    } else if (document === "Свидетельство о рождении") {
      Object.assign(rules, {
        documentSeries: {
          seriesOfBirthCertificate
        },
        documentNumber: {
          integer,
          minLength: minLength(6),
          maxLength: maxLength(6)
        },
        issuedBy: {
          sentencesRU,
          minLength: minLength(10),
          maxLength: maxLength(100)
        }
      });
    } else if (document === "Вод. удостоверение") {
      Object.assign(rules, {
        documentSeries: {
          integer,
          minLength: minLength(4),
          maxLength: maxLength(4)
        },
        documentNumber: {
          integer,
          minLength: minLength(6),
          maxLength: maxLength(6)
        },
        issuedBy: {
          trafficPoliceOfficeNumber
        }
      });
    }

    return rules;
  }
});
</script>

<style lang="scss" scoped>
.customer-form-document {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
