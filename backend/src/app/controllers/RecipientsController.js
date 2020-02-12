import * as Yup from 'yup';
import Recipient from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      complemento: Yup.string(),
      estado: Yup.string()
        .required()
        .max(2),
      cidade: Yup.string().required(),
      cep: Yup.string()
        .required()
        .min(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      rua: Yup.string(),
      numero: Yup.string(),
      complemento: Yup.string(),
      estado: Yup.string().max(2),
      cidade: Yup.string(),
      cep: Yup.string().min(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExist = await Recipient.findByPk(req.userId);

    if (!recipientExist) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    const recipient = await recipientExist.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientsController();
