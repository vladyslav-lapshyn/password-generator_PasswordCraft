import { useCallback, useEffect, useState } from 'react';
import { PasswordParams } from '../../types';
import { passwordGenerator } from '../../helpers/passwordGenerator';
import { copyPassword } from '../../helpers/copyPassword';
import { Button } from '../Button';
import { Icon } from '../Icon';
import './PasswordGenerator.scss';

export const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordParams, setPasswordParams] = useState<PasswordParams>({
    length: 8,
    uppercaseMode: true,
    lowercaseMode: true,
    numbersMode: false,
    symbolsMode: false,
  });

  const generatePassword = useCallback(() => {
    const newPassword = passwordGenerator(passwordParams);

    setGeneratedPassword(newPassword);
  }, [passwordParams]);

  const handleParamChange = (
    paramName: keyof PasswordParams,
    value: number | boolean,
  ) => {
    let newValue: number | boolean;

    if (paramName === 'length') {
      newValue = typeof value === 'number' ? value : passwordParams.length;
      newValue = Math.min(Math.max(newValue, 4), 48);
    } else {
      newValue = value as boolean;
    }

    setPasswordParams((prevParams) => ({
      ...prevParams,
      [paramName]: newValue,
    }));
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="PasswordGenerator">
      <div className="PasswordGenerator__password-block">
        <input
          className="PasswordGenerator__password-block-input"
          type="text"
          value={generatedPassword}
          readOnly
        />

        <Icon
          onClick={() => copyPassword(generatedPassword)}
          type="copy"
          title="Copy"
        />

        <Icon onClick={generatePassword} type="refresh" title="Refresh" />
      </div>

      <div className="PasswordGenerator__buttons-block">
        <Button
          onClick={() => copyPassword(generatedPassword)}
          disabled={!generatedPassword}>
          Copy Password
        </Button>

        <Button onClick={generatePassword}>Generate</Button>
      </div>

      <div className="PasswordGenerator__length-block">
        <label
          className="PasswordGenerator__length-text"
          htmlFor="passwordLength">
          Password length:
        </label>

        <span className="PasswordGenerator__length-count">
          {passwordParams.length}
        </span>

        <Icon
          onClick={() => handleParamChange('length', passwordParams.length - 1)}
          type="minus"
          title="Increase length"
        />

        <input
          className="PasswordGenerator__length-range"
          type="range"
          id="passwordLength"
          min="4"
          max="48"
          value={passwordParams.length}
          onChange={(e) =>
            handleParamChange('length', parseInt(e.target.value))
          }
        />

        <Icon
          onClick={() => handleParamChange('length', passwordParams.length + 1)}
          type="plus"
          title="Reduce length"
        />
      </div>

      <div className="PasswordGenerator__params-block">
        <div className="PasswordGenerator__params-field">
          <input
            id="uppercaseMode"
            type="checkbox"
            checked={passwordParams.uppercaseMode}
            onChange={(e) =>
              handleParamChange('uppercaseMode', e.target.checked)
            }
            className="PasswordGenerator__params-checkbox"
          />

          <label htmlFor="uppercaseMode">Uppercase (A-Z)</label>
        </div>

        <div className="PasswordGenerator__params-field">
          <input
            id="lowercaseMode"
            type="checkbox"
            checked={passwordParams.lowercaseMode}
            onChange={(e) =>
              handleParamChange('lowercaseMode', e.target.checked)
            }
            className="PasswordGenerator__params-checkbox"
          />

          <label htmlFor="lowercaseMode">Lowercase (a-z)</label>
        </div>

        <div className="PasswordGenerator__params-field">
          <input
            id="numbersMode"
            type="checkbox"
            checked={passwordParams.numbersMode}
            onChange={(e) => handleParamChange('numbersMode', e.target.checked)}
            className="PasswordGenerator__params-checkbox"
          />

          <label htmlFor="numbersMode">Numbers (0-9)</label>
        </div>

        <div className="PasswordGenerator__params-field">
          <input
            id="symbolsMode"
            type="checkbox"
            checked={passwordParams.symbolsMode}
            onChange={(e) => handleParamChange('symbolsMode', e.target.checked)}
            className="PasswordGenerator__params-checkbox"
          />

          <label htmlFor="symbolsMode">Symbols (!@#%)</label>
        </div>
      </div>
    </div>
  );
};
